import React from "react"
import type { CartItemType } from "@/types/cart/cartTypes"
import CartItem from "../molecule/CartItem"
import CartItemAllCheck from "../molecule/CartItemAllCheck"

interface CartItemContainerProps {
	items: CartItemType[]
}

function CartItemContainer({ items }: CartItemContainerProps) {
	return (
		<div className="space-y-4">
			<CartItemAllCheck />
			<div className="space-y-3">
				{items.map((item) => (
					<CartItem key={item.itemId} item={item} />
				))}
			</div>
		</div>
	)
}

export default CartItemContainer
