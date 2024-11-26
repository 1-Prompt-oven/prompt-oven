"use server"
import type { CartItemType } from "@/types/cart/cartTypes"
import type { CommonResType } from "@/types/common/responseType"
import { dummyCartItems } from "@/dummy/cart/cartData"

export async function getCartData(): Promise<CartItemType[]> {
	"use server"
	// const response = await fetch(`${process.env.API_BASE_URL}/v1/member/cart/${memberUuid}`, {
	//   method: 'GET',
	//   headers: {
	//     'Content-Type': 'application/json',
	//   },
	// })
	// const data: CartItemType[] = await response.json()
	// return data.result
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
	const deletePromises = itemIds.map(async (id) =>
		fetch(`${process.env.API_BASE_URL}/v1/member/cart`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ itemId: id }),
		}),
	)
	const results = await Promise.all(deletePromises)
	const isSuccess = results.every((response) => response.ok)
	return isSuccess
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
			cartId: item.itemId,
			selected: selected,
		}),
	})
	const responseData: CommonResType = await res.json()
	const isSuccess = responseData.isSuccess
	return isSuccess
}
