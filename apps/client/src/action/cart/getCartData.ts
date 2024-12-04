"use server"
import type { CartItemType } from "@/types/cart/cartTypes"
// import type { PromptsType } from "@/types/prompts/promptsType"
import { dummyCartItems } from "@/dummy/cart/cartData"

export async function getCartData(
	_memberUuid: string,
): Promise<CartItemType[]> {
	return dummyCartItems
}

export async function deleteCartItem(itemId: string): Promise<void> {
	"use server"
	await fetch(`${process.env.API_BASE_URL}/v1/member/cart`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ itemId }),
	})
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
	await fetch(`${process.env.API_BASE_URL}/v1/member/cart`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			cartId: item.productUuid,
			selected,
		}),
	})
	return true
}
