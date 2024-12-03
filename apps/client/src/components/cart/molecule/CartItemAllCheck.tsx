import React from "react"
import { CheckBox } from "@repo/ui/checkbox"

function CartItemAllCheck({
	handleSelectAll,
}: {
	handleSelectAll: (checked: boolean) => void
}) {
	return (
		<div className="flex items-center justify-between border-b border-gray-800 p-4">
			<div className="flex items-center space-x-2">
				<CheckBox onClick={() => handleSelectAll(true)} />
				<span className="text-sm text-gray-200">Select All Items</span>
			</div>
			<button
				type="button"
				className="text-sm text-purple-400 hover:text-purple-300">
				REMOVE
			</button>
		</div>
	)
}

export default CartItemAllCheck
