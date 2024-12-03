import React from "react"
import { CheckBox } from "@repo/ui/checkbox"
import Image from "next/image"
import { Trash2 } from "@repo/ui/lucide"
import type { CartItemType } from "@/types/cart/cartTypes"

interface CartItemProps {
	item: CartItemType
	handleSelectItem: (item: CartItemType) => void
	handleDeleteItems: () => void
}

function CartItem({
	item,
	handleSelectItem,
	handleDeleteItems,
}: CartItemProps) {
	return (
		<div className="flex items-center space-x-4 rounded-lg bg-gray-900 p-4">
			<CheckBox
				checked={item.selected}
				className="h-4 w-4 border-gray-400 bg-transparent"
				onClick={() => handleSelectItem(item)}
			/>
			<div className="relative h-16 w-16">
				<Image
					src={item.thumbnailUrl}
					alt={item.productName}
					className="rounded-md object-cover"
					fill
				/>
			</div>

			<div className="flex-1">
				<h3 className="text-sm font-medium text-gray-200">
					{item.productName}
				</h3>
				<p className="mt-1 text-xs text-gray-400">{item.llmName}</p>
			</div>
			<span className="font-medium text-purple-400">
				{item.price.toLocaleString()} 원
			</span>
			<button type="button" className="text-gray-400 hover:text-gray-300">
				<Trash2 className="h-5 w-5" onClick={() => handleDeleteItems()} />
			</button>
		</div>
	)
}

export default CartItem

