/* eslint-disable no-console -- 개발 중 디버깅을 위해 console 사용을 허용 */
"use server"
import type { CartItemType } from "@/types/cart/cartTypes"
import type {
	CommonResType,
	PromptApiResponseType,
	CartItemApiResponseType,
} from "@/types/common/responseType"

export async function getCartData(
	_memberUuid: string,
): Promise<CartItemType[]> {
	"use server"
	try {
		// 장바구니 데이터 가져오기
		const response = await fetch(
			`${process.env.API_BASE_URL}/v1/member/cart/299b66a0-e1e7-448e-b396-ba681fcc2aea`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer `,
				},
			},
		)
		if (!response.ok) {
			throw new Error("카트 데이터 가져오기 실패")
		}
		const data: CommonResType<CartItemApiResponseType[]> = await response.json()
		const cartItems = data.result

		// 상품 상세 데이터 요청
		const productDetailsPromises = cartItems.map(async (cartItem) => {
			const productResponse = await fetch(
				`${process.env.API_BASE_URL}/v1/product/${cartItem.productUuid}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer `,
					},
					next: { revalidate: 1800 },
				},
			)

			if (!productResponse.ok) {
				throw new Error(`상품 상세 정보 가져오기 실패: ${cartItem.productUuid}`)
			}

			const productData: CommonResType<PromptApiResponseType> =
				await productResponse.json()

			return productData.result.productList[0]
		})

		// 모든 상품 정보 병렬 요청
		const productDetails = await Promise.all(productDetailsPromises)

		// LLM 모델명 요청
		const llmModelNamePromises = productDetails.map(async (product) => {
			const llmResponse = await fetch(
				`${process.env.API_BASE_URL}/v1/llm/${product.llmId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer `,
					},
					next: { revalidate: 86400 },
				},
			)

			if (!llmResponse.ok) {
				throw new Error(`LLM 모델명 가져오기 실패: ${product.llmId}`)
			}

			const llmData: CommonResType<{ modelName: string }> =
				await llmResponse.json()

			return { llmId: product.llmId, modelName: llmData.result.modelName }
		})

		// 모든 LLM 모델명 병렬 요청
		const llmModelNames = await Promise.all(llmModelNamePromises)

		// 상품 정보와 장바구니 데이터 매핑
		const finalCartData: CartItemType[] = cartItems.map((cartItem) => {
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
				thumbnailUrl: product.thumbnailUrl,
				llmName: llmModel.modelName,
			}
		})

		return finalCartData
	} catch (error) {
		console.error("카트 데이터 fetching 실패", error)
		return []
	}
}

export async function deleteCartItem(itemId: string): Promise<void> {
	"use server"
	const response = await fetch(`${process.env.API_BASE_URL}/v1/member/cart`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ itemId }),
	})
	const responseData: CommonResType = await response.json()

	if (!responseData.isSuccess) {
		throw new Error("Failed to delete cart item")
	}

	return
}

export async function deleteCartItemList(itemIds: string[]): Promise<boolean> {
	"use server"
	try {
		const deletePromises = itemIds.map((id) => deleteCartItem(id))
		await Promise.all(deletePromises)
		return true
	} catch (error) {
		// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
		console.error("여러 상품 삭제 fetching 실패", error)
		return false
	}
}

export const cartCheckUpdate = async (
	item: CartItemType,
	selected: boolean,
): Promise<boolean> => {
	"use server"
	const res = await fetch(`${process.env.API_BASE_URL}/v1/member/cart`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer `,
		},
		body: JSON.stringify({
			cartId: item.id,
			selected,
		}),
	})
	const responseData: CommonResType = await res.json()
	const isSuccess = responseData.isSuccess
	return isSuccess
}
