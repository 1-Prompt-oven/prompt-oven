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
		<div className="flex min-w-[280px] flex-col gap-4 rounded-lg bg-gray-900 p-4">
			<div className="mx-3 flex items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<CheckBox
						checked={item.selected}
						className="h-4 w-4 border-gray-400 bg-transparent"
						onClick={() => handleSelectItem(item)}
					/>

					<div className="relative h-16 w-16">
						<Image
							src={item.thumbnailUrl}
							sizes="(min-width: 145px) 100vw, 145px"
							alt={item.productName}
							className="rounded-md"
							fill
							unoptimized
						/>
					</div>

					<div className="hidden sm:!block">
						<h3 className="text-sm font-medium text-gray-200">
							{item.productName}
						</h3>
						<p className="mt-1 text-xs text-gray-400">{item.llmName}</p>
					</div>
				</div>

				{/* 가격, 삭제 */}
				<div className="flex items-center gap-4">
					<p className="mt-1 flex items-center gap-1 font-medium text-purple-400">
						<span className="text-xs">₩</span>
						<span>{item.price.toLocaleString()}</span>
					</p>
					<button type="button" className="text-gray-400 hover:text-gray-300">
						<Trash2 className="h-5 w-5" onClick={() => handleDeleteItems()} />
					</button>
				</div>
			</div>
			<div className="ml-10 block sm:!hidden">
				<h3 className="text-sm font-medium text-gray-200">
					{item.productName}
				</h3>
				<p className="mt-1 text-xs text-gray-400">{item.llmName}</p>
			</div>
		</div>
	)
}

export default CartItem
