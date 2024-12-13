"use client"

import { useRouter } from "next/navigation"
import type { CartItemType } from "@/types/cart/cartTypes"
import {
	cartCheckUpdate,
	deleteCartItemList,
	postCheckoutData,
} from "@/action/cart/cartAction"
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
	const router = useRouter()

	// 전체 체크 및 해제
	const handleSelectAll = async (checked: boolean) => {
		const updatedItems = initialItems.map((item) => ({
			...item,
			selected: checked,
		}))

		await Promise.all(
			updatedItems.map((item) => cartCheckUpdate(item, checked)),
		)
	}

	// 개별 체크 및 해제
	const handleSelectItem = async (item: CartItemType) => {
		const newItemState = { ...item, selected: !item.selected }
		await cartCheckUpdate(newItemState, newItemState.selected)
	}

	const handleDeleteItems = async (itemIds: number[]) => {
		if (!itemIds.length) return
		await deleteCartItemList(itemIds)
	}

	const handleDeleteSelectedItems = () => {
		const selectedItemIds = initialSelectedItems.map((item) => item.id)
		handleDeleteItems(selectedItemIds)
	}

	const handleCheckout = async () => {
		if (!initialSelectedItems.length) {
			return
		}
		try {
			const items = initialSelectedItems.map((item) => ({
				productUuid: item.productUuid,
				productName: item.productName,
				price: item.price,
			}))
			const success = await postCheckoutData(items)
			if (success) {
				router.push("/account?view=purchase-ongoing")
			} else {
				throw new Error("결제 중 오류 발생")
			}
		} catch (error) {
			throw new Error("결제 처리 중 에러 발생")
		}
	}

	return (
		<div className="mx-auto mt-4 flex min-h-[600px] max-w-screen-xl flex-col gap-8">
			<CartTitle />

			<div className="mx-6 flex flex-col justify-between gap-12 lg:!flex-row">
				<CartItemContainer
					cartItems={initialItems}
					handleSelectAll={handleSelectAll}
					handleSelectItem={handleSelectItem}
					handleDeleteItems={handleDeleteItems}
					handleDeleteSelectedItems={handleDeleteSelectedItems}
				/>
				<CartCheckout
					totalPrice={initialTotalPrice}
					onCheckout={handleCheckout}
				/>
			</div>
		</div>
	)
}

export default CartTemplate
