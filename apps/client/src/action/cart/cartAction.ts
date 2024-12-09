/* eslint-disable no-console -- 개발 중 디버깅을 위해 console 사용을 허용 */
"use server"
import { getAuthHeaders } from "@/lib/api/headers"
import type { CartItemType } from "@/types/cart/cartTypes"
import type {
	CommonResType,
	CartItemApiResponseType,
} from "@/types/common/responseType"
import type { PromptDetailType } from "@/types/search/searchResultType"
import { getMemberUUID } from "@/lib/api/sessionExtractor"

export async function cartData(): Promise<CartItemType[]> {
	"use server"
	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()
	if (!memberUUID) {
		throw new Error("로그인이 필요합니다")
	}
	try {
		// 장바구니 데이터 가져오기
		const response = await fetch(
			`${process.env.API_BASE_URL}/v1/member/cart/list/${memberUUID}`,
			{
				method: "GET",
				headers,
			},
		)

		const data: CommonResType<CartItemApiResponseType[]> = await response.json()
		const cartItems = data.result
		// 상품 상세 데이터 요청
		if (cartItems.length === 0) {
			return []
		}
		const productDetails = await fetchProductDetails(cartItems)
		const llmModelNames = await fetchLlmModelName(productDetails)
		return mapCartData(cartItems, productDetails, llmModelNames)
	} catch (error) {
		console.error("카트 데이터 fetching 실패", error)
		return []
	}
}

async function fetchProductDetails(cartItems: CartItemApiResponseType[]) {
	const productDetailsPromises = cartItems.map(async (cartItem) => {
		console.log("productResponse", cartItem.productUuid)
		const productResponse = await fetch(
			`${process.env.API_BASE_URL}/v1/product/${cartItem.productUuid}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				next: { revalidate: 1800 },
			},
		)

		if (!productResponse.ok) {
			throw new Error(`상품 상세 정보 가져오기 실패: ${cartItem.productUuid}`)
		}

		const productData: CommonResType<PromptDetailType> =
			await productResponse.json()

		return productData.result
	})
	return Promise.all(productDetailsPromises)
}

async function fetchLlmModelName(productDetails: PromptDetailType[]) {
	const llmModelNamePromises = productDetails.map(async (product) => {
		const llmResponse = await fetch(
			`${process.env.API_BASE_URL}/v1/product/llm/${product.llmId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				next: { revalidate: 86400 },
			},
		)

		if (!llmResponse.ok) {
			throw new Error(`LLM 모델명 가져오기 실패: ${product.llmId}`)
		}

		const llmData: CommonResType<{ llmName: string }> = await llmResponse.json()

		return { llmId: product.llmId, modelName: llmData.result.llmName }
	})

	return Promise.all(llmModelNamePromises)
}

function mapCartData(
	cartItems: CartItemApiResponseType[],
	productDetails: PromptDetailType[],
	llmModelNames: { llmId: number; modelName: string }[],
): CartItemType[] {
	return cartItems.map((cartItem) => {
		const product = productDetails.find(
			(p) => p.productUuid === cartItem.productUuid,
		)
		if (!product) {
			throw new Error(
				`uuid에 해당하는 프롬프트 못 찾음: ${cartItem.productUuid}`,
			)
		}

		const llmModel = llmModelNames.find((llm) => llm.llmId === product.llmId)
		if (!llmModel) {
			throw new Error(`LLM 모델명 못 찾음: ${product.llmId}`)
		}

		return {
			id: cartItem.id,
			memberUuid: cartItem.memberUuid,
			productUuid: product.productUuid,
			productName: product.productName,
			price: product.price,
			selected: cartItem.selected,
			thumbnailUrl: product.contents[0]?.contentUrl || "",
			llmName: llmModel.modelName,
		}
	})
}

export async function deleteCartItem(cartId: number): Promise<void> {
	"use server"
	const headers = await getAuthHeaders()
	try {
		const response = await fetch(
			`${process.env.API_BASE_URL}/v1/member/cart/${cartId}`,
			{
				method: "DELETE",
				headers,
			},
		)

		await response.json()
	} catch (error) {
		console.error("카트 데이터 fetching 실패", error)
	}
}

export async function deleteCartItemList(cartIds: number[]): Promise<boolean> {
	"use server"
	try {
		const deletePromises = cartIds.map((id) => deleteCartItem(id))
		await Promise.all(deletePromises)
		return true
	} catch (error) {
		console.error("여러 상품 삭제 fetching 실패", error)
		return false
	}
}

export const cartCheckUpdate = async (
	item: CartItemType,
	selected: boolean,
): Promise<boolean> => {
	"use server"
	const headers = await getAuthHeaders()
	const res = await fetch(`${process.env.API_BASE_URL}/v1/member/cart`, {
		method: "PUT",
		headers,
		body: JSON.stringify({
			cartId: item.id,
			selected,
		}),
	})
	const responseData: CommonResType<Record<string, never>> = await res.json()
	const isSuccess = responseData.isSuccess
	return isSuccess
}
export async function postCheckoutData(
	items: {
		productUuid: string
		productName: string
		price: number
	}[],
): Promise<boolean> {
	"use server"
	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()

	try {
		const itemsWithMemberUuid = items.map((item) => ({
			...item,
			memberUuid: memberUUID,
		}))
		const response = await fetch(
			`${process.env.API_BASE_URL}/v1/member/purchase/temp`,
			{
				method: "POST",
				headers,
				body: JSON.stringify(itemsWithMemberUuid),
			},
		)
		if (!response.ok) {
			throw new Error("결제 정보를 전송하는 데 실패했습니다.")
		}
		const data: CommonResType<Record<string, never>> = await response.json()

		if (data.isSuccess) {
			return true
		}
		console.error("결제 요청 실패:", data.message)
		return false
	} catch (error) {
		console.error("Checkout API error:", error)
		return false
	}
}
