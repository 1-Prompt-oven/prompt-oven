import type { CartItemType } from "@/types/cart/cartTypes"

export async function calculateTotalPrice(cartItems: CartItemType[]) {
	return cartItems
		.filter((item) => item.selected)
		.reduce((acc, item) => acc + item.productPrice, 0)
}
