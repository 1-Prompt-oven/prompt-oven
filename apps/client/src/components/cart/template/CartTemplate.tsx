"use client"

import React, { useState, useEffect } from "react"
import type { CartItemType } from "@/types/cart/cartTypes"
import { cartCheckUpdate, deleteCartItemList } from "@/action/cart/cartAction"
import { calculateTotalPrice } from "@/action/cart/cartDataAction"
import CartItemContainer from "../organism/CartItemContainer"
import CartCheckout from "../organism/CartCheckout"

interface CartTemplateProps {
	initialItems: CartItemType[]
	initialSelectedItems: CartItemType[]
	initialTotalPrice: number
}

function CartTemplate({
	initialItems,
	initialSelectedItems,
	initialTotalPrice,
}: CartTemplateProps) {
	const [cartItems, setCartItems] = useState<CartItemType[]>(initialItems)
	const [selectedItems, setSelectedItems] =
		useState<CartItemType[]>(initialSelectedItems)
	const [totalPrice, setTotalPrice] = useState<number>(initialTotalPrice)

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

	useEffect(() => {
		const updateTotalPrice = async () => {
			const newTotalPrice = await calculateTotalPrice(selectedItems)
			setTotalPrice(newTotalPrice)
		}

		updateTotalPrice()
	}, [selectedItems])

	return (
		<div className="container mx-auto max-w-7xl">
			<h1 className="mb-8 text-2xl font-bold text-white">My Cart</h1>
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
				<div className="lg:col-span-2">
					<CartItemContainer
						cartItems={cartItems}
						handleSelectAll={handleSelectAll}
						handleSelectItem={handleSelectItem}
						handleDeleteItems={handleDeleteItems}
						handleDeleteSelectedItems={handleDeleteSelectedItems}
					/>
				</div>
				<div className="h-auto">
					<CartCheckout totalPrice={totalPrice} />
				</div>
			</div>
		</div>
	)
}

export default CartTemplate
