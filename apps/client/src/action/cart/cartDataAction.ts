import type { CartItemType } from "@/types/cart/cartTypes"

export async function calculateTotalPrice(cartItems: CartItemType[]) {
	return cartItems.reduce((acc, item) => acc + item.price, 0)
}
