import React from "react"
import type { CartItemType } from "@/types/cart/cartTypes"
import { getCartData } from "@/action/cart/cartAction"
import { calculateTotalPrice } from "@/action/cart/cartDataAction"
import CartItemContainer from "@/components/cart/organism/CartItemContainer"
import CartCheckout from "@/components/cart/organism/CartCheckout"

async function cart() {
	const items: CartItemType[] = await getCartData()
	const selectedItem = items.filter((item) => item.selected)
	const selectedItemsTotalPrice = await calculateTotalPrice(selectedItem)

	return (
		<main className="min-h-screen bg-black pt-10">
			<div className="container mx-auto max-w-7xl">
				<h1 className="mb-8 text-2xl font-bold text-white">My Cart</h1>
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
					<div className="lg:col-span-2">
						<CartItemContainer
							initialItems={items}
							initialSelectedItems={selectedItem}
						/>
					</div>
					<div className="h-auto">
						<CartCheckout totalPrice={selectedItemsTotalPrice} />
					</div>
				</div>
			</div>
		</main>
	)
}

export default cart
