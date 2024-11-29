"use server"
import type { CartItemType } from "@/types/cart/cartTypes"
import type {
	CommonResType,
	// ProductApiResponseType,
	// CartItemApiResponseType,
} from "@/types/common/responseType"
// import type { PromptsType } from "@/types/prompts/promptsType"
import { dummyCartItems } from "@/dummy/cart/cartData"

export async function getCartData(
	_memberUuid: string,
): Promise<CartItemType[]> {
	// "use server"
	// try {
	// 	// 장바구니 데이터 가져오기
	// 	const response = await fetch(
	// 		`${process.env.API_BASE_URL}/v1/member/cart/${memberUuid}`,
	// 		{
	// 			method: "GET",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${auth.accessToken}`,
	// 			},
	// 		},
	// 	)
	// 	if (!response.ok) {
	// 		throw new Error("카트 데이터 가져오기 실패")
	// 	}
	// 	const data: CommonResType<CartItemApiResponseType[]> = await response.json()
	// 	const cartItems = data.result

	// 	// 상품 상세 데이터 요청
	// 	const productDetailsPromises = cartItems.map(async (cartItem) => {
	// 		const productResponse = await fetch(
	// 			`${process.env.API_BASE_URL}/v1/product/${cartItem.productUuid}`,
	// 			{
	// 				method: "GET",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization: `Bearer ${auth.accessToken}`,
	// 				},
	// 			},
	// 		)

	// 		if (!productResponse.ok) {
	// 			throw new Error(`상품 상세 정보 가져오기 실패: ${cartItem.productUuid}`)
	// 		}

	// 		const productData: CommonResType<ProductApiResponseType> =
	// 			await productResponse.json()

	// 		return productData.result.productList[0]
	// 	})

	// 	// 모든 상품 정보 병렬 요청
	// 	const productDetails = await Promise.all(productDetailsPromises)

	// 	// 상품 정보와 장바구니 데이터 매핑
	// 	const finalCartData: CartItemType[] = cartItems.map((cartItem) => {
	// 		const product = productDetails.find(
	// 			(p) => p.productUuid === cartItem.productUuid,
	// 		)
	// 		if (!product) {
	// 			throw new Error(
	// 				`uuid에 해당하는 프롬프트 못 찾음: ${cartItem.productUuid}`,
	// 			)
	// 		}
	// 		return {
	// 			memberUuid: cartItem.memberUuid,
	// 			productUuid: product.productUuid,
	// 			productName: product.productName,
	// 			price: product.price,
	// 			selected: cartItem.selected,
	// 			thumbnailUrl: product.thumbnailUrl,
	// 		}
	// 	})

	// 	return finalCartData
	// } catch (error) {
	// 	console.error("카트 데이터 fetching 실패", error)
	// 	return []
	// }
	return dummyCartItems
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
		},
		body: JSON.stringify({
			cartId: item.productUuid,
			selected: selected,
		}),
	})
	const responseData: CommonResType = await res.json()
	const isSuccess = responseData.isSuccess
	return isSuccess
}
