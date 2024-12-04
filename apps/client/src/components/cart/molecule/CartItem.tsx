import React from "react"
import { CheckBox } from "@repo/ui/checkbox"
import Image from "next/image"
import type { CartItemType } from "@/types/cart/cartTypes"

interface CartItemProps {
	item: CartItemType
}

function CartItem({ item }: CartItemProps) {
	return (
		<div className="flex items-center space-x-4 rounded-lg bg-gray-900 p-4">
			<CheckBox checked={item.selected} />
			<Image
				src={item.thumbnailUrl}
				alt={item.productName}
				className="h-16 w-16 rounded-md object-cover"
			/>
			<div className="flex-1">
				<h3 className="text-sm text-gray-200">{item.productName}</h3>
				<p className="text-xs text-gray-400">SKU: {item.productUuid}</p>
			</div>
			<div className="font-medium text-purple-400">
				{item.price.toLocaleString()} 원
			</div>
		</div>
	)
}

export default CartItem
