"use client"

import type { CartItemType } from "@/types/cart/cartTypes"
import CartItem from "../molecule/CartItem"
import CartItemAllCheck from "../molecule/CartItemAllCheck"

interface CartItemContainerProps {
	cartItems: CartItemType[]
	handleSelectAll: (checked: boolean) => void
	handleSelectItem: (item: CartItemType) => void
	handleDeleteItems: (itemIds: number[]) => void
	handleDeleteSelectedItems: () => void
}

function CartItemContainer({
	cartItems,
	handleSelectAll,
	handleSelectItem,
	handleDeleteItems,
	handleDeleteSelectedItems,
}: CartItemContainerProps) {
	return (
		<div className="space-y-4">
			<CartItemAllCheck
				allSelected={
					cartItems.length > 0 && cartItems.every((item) => item.selected)
				}
				handleSelectAll={handleSelectAll}
				handleDeleteSelectedItems={handleDeleteSelectedItems}
			/>
			<div className="space-y-3">
				{cartItems.map((item) => (
					<CartItem
						key={item.productUuid}
						item={item}
						handleSelectItem={handleSelectItem}
						handleDeleteItems={() => handleDeleteItems([item.id])}
					/>
				))}
			</div>
		</div>
	)
}

export default CartItemContainer

