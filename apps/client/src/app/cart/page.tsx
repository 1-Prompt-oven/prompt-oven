import React from "react"
import type { CartItemType } from "@/types/cart/cartTypes"
import { getCartData } from "@/action/cart/cartAction"
import { calculateTotalPrice } from "@/action/cart/cartDataAction"
import CartTemplate from "@/components/cart/template/CartTemplate"

async function cart() {
	const items: CartItemType[] = await getCartData()
	const selectedItem = items.filter((item) => item.selected)
	const selectedItemsTotalPrice = await calculateTotalPrice(selectedItem)

	return (
		<main className="min-h-screen bg-black pt-10">
			<CartTemplate
				initialItems={items}
				initialSelectedItems={selectedItem}
				initialTotalPrice={selectedItemsTotalPrice}
			/>
		</main>
	)
}

export default cart
