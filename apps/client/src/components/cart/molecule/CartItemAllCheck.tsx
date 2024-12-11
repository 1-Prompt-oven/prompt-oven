import React from "react"
import { CheckBox } from "@repo/ui/checkbox"

function CartItemAllCheck({
	allSelected,
	handleSelectAll,
	handleDeleteSelectedItems,
}: {
	allSelected: boolean
	handleSelectAll: (checked: boolean) => void
	handleDeleteSelectedItems: () => void
}) {
	return (
		<div className="flex items-center justify-between rounded-lg border border-purple-500 p-4">
			<div className="flex items-center gap-3">
				<CheckBox
					checked={allSelected}
					className="h-4 w-4 border-gray-400 bg-transparent"
					onClick={() => handleSelectAll(!allSelected)}
				/>
				<span className="text-sm font-semibold text-gray-300">
					{/* Select All Items */}
					모든 상품 선택
				</span>
			</div>
			<button
				type="button"
				className="text-xs font-medium text-purple-400 hover:text-purple-300"
				onClick={handleDeleteSelectedItems}>
				{/* REMOVE */}
				<span>삭제하기</span>
			</button>
		</div>
	)
}

export default CartItemAllCheck
