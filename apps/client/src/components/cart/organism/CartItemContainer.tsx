"use client"

import React, { useState, useEffect } from "react"
import type { CartItemType } from "@/types/cart/cartTypes"
import {
	cartCheckUpdate,
	// deleteCartItem,
	// deleteCartItemList,
} from "@/action/cart/getCartData"
import { calculateTotalPrice } from "@/action/cart/cartDataAction"
import CartItem from "../molecule/CartItem"
import CartItemAllCheck from "../molecule/CartItemAllCheck"

interface CartItemContainerProps {
	initialItems: CartItemType[]
	initialSelectedItems: CartItemType[]
}

function CartItemContainer({
	initialItems,
	initialSelectedItems,
}: CartItemContainerProps) {
	const [cartItems, setCartItems] = useState<CartItemType[]>(initialItems)
	const [selectedItems, setSelectedItems] =
		useState<CartItemType[]>(initialSelectedItems)
	// 전체 체크 및 해제하는 액션
	const handleSelectAll = async () => {
		const allSelected = cartItems.every((item) => item.selected)
		const newSelectedState = !allSelected

		await Promise.all(
			cartItems.map((item) => cartCheckUpdate(item, newSelectedState)),
		)

		const updatedItems = cartItems.map((item) => ({
			...item,
			selected: newSelectedState,
		}))
		// PR-4396652f
		// 299b66a0-e1e7-448e-b396-ba681fcc2aea
		setCartItems(updatedItems)
		await calculateTotalPrice(updatedItems)
	}

	// 개별 체크 및 해제하는 액션

	const handleSelectItem = async (item: CartItemType) => {
		const newItemState = { ...item, selected: !item.selected }
		await cartCheckUpdate(newItemState, newItemState.selected)

		const updatedItems = cartItems.map((cartItem) =>
			cartItem.productUuid === item.productUuid ? newItemState : cartItem,
		)

		setCartItems(updatedItems)
		setSelectedItems(updatedItems.filter((updatedItem) => updatedItem.selected))
		await calculateTotalPrice(updatedItems)
	}

	useEffect(() => {
		setCartItems(cartItems)
		setSelectedItems(selectedItems)
	}, [cartItems, selectedItems])

	return (
		<div className="space-y-4">
			<CartItemAllCheck handleSelectAll={handleSelectAll} />
			<div className="space-y-3">
				{cartItems.map((item) => (
					<CartItem
						key={item.productUuid}
						item={item}
						handleSelectItem={handleSelectItem}
					/>
				))}
			</div>
		</div>
	)
}

export default CartItemContainer
