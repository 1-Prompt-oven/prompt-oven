import React from "react"
import type { CartItemType } from "@/types/cart/cartTypes"
import CartItem from "../molecule/CartItem"
import CartItemAllCheck from "../molecule/CartItemAllCheck"

interface CartItemContainerProps {
	items: CartItemType[]
}

function CartItemContainer({ items }: CartItemContainerProps) {
	return (
		<>
			<CartItemAllCheck />
			{items.map((item) => (
				<CartItem key={item.itemId} />
			))}
		</>
	)
}

export default CartItemContainer
