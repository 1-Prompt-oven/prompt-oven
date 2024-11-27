import React from "react"
import type { CartItemType } from "@/types/cart/cartTypes"
import { getCartData } from "@/action/cart/getCartData"
import { calculateTotalPrice } from "@/action/cart/cartDataAction"
import CartItemContainer from "@/components/cart/organism/CartItemContainer"
import CartCheckout from "@/components/cart/organism/CartCheckout"

async function cart() {
	const _memberUuid = "uuid" // 더미 uuid
	const items: CartItemType[] = await getCartData(_memberUuid)
	const selectedItem = items.filter((item) => item.selected)
	const selectedItemsTotalPrice = await calculateTotalPrice(selectedItem)

	return (
		<main className="min-h-screen bg-black p-6">
			<div className="mx-auto max-w-6xl">
				<h1 className="mb-6 text-2xl font-bold text-white">My Cart</h1>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<CartItemContainer
							initialItems={items}
							initialSelectedItems={selectedItem}
						/>
					</div>
					<CartCheckout totalPrice={selectedItemsTotalPrice} />
				</div>
			</div>
		</main>
	)
}

export default cart
