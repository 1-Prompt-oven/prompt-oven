"use client"

import React, { useState, useEffect } from "react"
import type { CartItemType } from "@/types/cart/cartTypes"
import { cartCheckUpdate, deleteCartItemList } from "@/action/cart/cartAction"
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

	// 전체 체크 및 해제
	const handleSelectAll = async (checked: boolean) => {
		const updatedItems = cartItems.map((item) => ({
			...item,
			selected: checked,
		}))

		await Promise.all(
			updatedItems.map((item) => cartCheckUpdate(item, checked)),
		)

		setCartItems(updatedItems)
		setSelectedItems(checked ? updatedItems : [])
		await calculateTotalPrice(updatedItems)
	}

	// 개별 체크 및 해제

	const handleSelectItem = async (item: CartItemType) => {
		const newItemState = { ...item, selected: !item.selected }

		const updatedItems = cartItems.map((cartItem) =>
			cartItem.productUuid === item.productUuid ? newItemState : cartItem,
		)
		await cartCheckUpdate(newItemState, newItemState.selected)

		setCartItems(updatedItems)
		setSelectedItems(updatedItems.filter((updatedItem) => updatedItem.selected))
		await calculateTotalPrice(updatedItems)
	}

	const handleDeleteItems = async (itemIds: number[]) => {
		if (!itemIds.length) return
		await deleteCartItemList(itemIds)
		const updatedItems = cartItems.filter(
			(cartItem) => !itemIds.includes(cartItem.id),
		)
		setCartItems(updatedItems)
		const updatedSelectedItems = selectedItems.filter(
			(item) => !itemIds.includes(item.id),
		)
		setSelectedItems(updatedSelectedItems)
		await calculateTotalPrice(updatedItems)
	}

	const handleDeleteSelectedItems = () => {
		const selectedItemIds = selectedItems.map((item) => item.id)
		handleDeleteItems(selectedItemIds)
	}

	useEffect(() => {
		setSelectedItems(cartItems.filter((item) => item.selected))
	}, [cartItems])

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
