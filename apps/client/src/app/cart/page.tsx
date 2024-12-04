import React from "react"
import type { CartItemType } from "@/types/cart/cartTypes"
import { cartData } from "@/action/cart/cartAction"
import { calculateTotalPrice } from "@/action/cart/cartDataAction"
import CartTemplate from "@/components/cart/template/CartTemplate"

async function cart() {
	const items: CartItemType[] = await cartData()
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

