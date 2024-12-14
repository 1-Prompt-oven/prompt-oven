"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { CartItemType } from "@/types/cart/cartTypes"
import {
	cartCheckUpdate,
	deleteCartItemList,
	postCheckoutData,
} from "@/action/cart/cartAction"
import FailBuy from "@/components/common/atom/FailBuyModal"
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
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedItemIds, setSelectedItemIds] = useState<number[]>(
		initialSelectedItems.map((item) => item.id),
	) // 체크된 상품 ID 상태 추가

	// 전체 체크 및 해제
	const handleSelectAll = async (checked: boolean) => {
		const updatedItems = initialItems.map((item) => ({
			...item,
			selected: checked,
		}))

		await Promise.all(
			updatedItems.map((item) => cartCheckUpdate(item, checked)),
		)

		// 전체 선택 시 체크된 상품 ID 업데이트
		if (checked) {
			setSelectedItemIds(updatedItems.map((item) => item.id))
		} else {
			setSelectedItemIds([])
		}
	}

	// 개별 체크 및 해제
	const handleSelectItem = async (item: CartItemType) => {
		const newItemState = { ...item, selected: !item.selected }
		await cartCheckUpdate(newItemState, newItemState.selected)

		// 체크된 상품 ID 업데이트
		if (newItemState.selected) {
			setSelectedItemIds((prev) => [...prev, newItemState.id]) // 체크 시 추가
		} else {
			setSelectedItemIds((prev) => prev.filter((id) => id !== newItemState.id)) // 체크 해제 시 제거
		}
	}

	const handleDeleteItems = async (itemIds: number[]) => {
		if (!itemIds.length) return
		await deleteCartItemList(itemIds)
	}

	const handleDeleteSelectedItems = () => {
		handleDeleteItems(selectedItemIds) // 체크된 상품 ID 사용
		setSelectedItemIds([]) // 삭제 후 체크된 상품 ID 초기화
	}

	const handleCheckout = async () => {
		if (!selectedItemIds.length) {
			return
		} else if (selectedItemIds.length > 4) {
			setIsOpen(!isOpen)
			return
		}
		try {
			const items = initialItems
				.filter((item) => selectedItemIds.includes(item.id))
				.map((item) => ({
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
					count={selectedItemIds.length}
					totalPrice={initialTotalPrice}
					onCheckout={handleCheckout}
				/>
			</div>

			{isOpen ? <FailBuy isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
		</div>
	)
}

export default CartTemplate
