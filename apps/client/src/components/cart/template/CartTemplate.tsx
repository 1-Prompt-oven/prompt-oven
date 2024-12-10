"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { CartItemType } from "@/types/cart/cartTypes"
import {
	cartCheckUpdate,
	deleteCartItemList,
	postCheckoutData,
} from "@/action/cart/cartAction"
import { calculateTotalPrice } from "@/action/cart/cartDataAction"
import CartItemContainer from "../organism/CartItemContainer"
import CartCheckout from "../organism/CartCheckout"
import CartTitle from "../atom/CartTitle"

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
	const router = useRouter()

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

	const handleCheckout = async () => {
		if (!selectedItems.length) {
			return
		}
		try {
			const items = selectedItems.map((item) => ({
				productUuid: item.productUuid,
				productName: item.productName,
				price: item.price,
			}))
			const success = await postCheckoutData(items)
			if (success) {
				router.push("/purchase/ing")
			} else {
				throw new Error("결제 중 오류 발생")
			}
		} catch (error) {
			throw new Error("결제 처리 중 에러 발생")
		}
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
		<div className="mx-auto mt-4 flex max-w-screen-xl flex-col gap-8">
			<CartTitle />

			<div className="mx-6 flex flex-col justify-between gap-12 lg:!flex-row">
				<CartItemContainer
					cartItems={cartItems}
					handleSelectAll={handleSelectAll}
					handleSelectItem={handleSelectItem}
					handleDeleteItems={handleDeleteItems}
					handleDeleteSelectedItems={handleDeleteSelectedItems}
				/>
				<CartCheckout totalPrice={totalPrice} onCheckout={handleCheckout} />
			</div>
		</div>
	)
}

export default CartTemplate
