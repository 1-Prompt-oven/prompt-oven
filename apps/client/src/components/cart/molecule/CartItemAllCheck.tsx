import React from "react"
import { CheckBox } from "@repo/ui/checkbox"

function CartItemAllCheck({
	handleSelectAll,
}: {
	handleSelectAll: (checked: boolean) => void
}) {
	return (
		<div className="flex items-center justify-between rounded-lg border border-purple-500 p-4">
			<div className="flex items-center space-x-3">
				<CheckBox
					className="h-4 w-4 border-gray-400 bg-transparent"
					onClick={() => handleSelectAll(true)}
				/>
				<span className="text-sm font-medium text-gray-300">
					Select All Items
				</span>
			</div>
			<button className="text-xs font-medium text-purple-400 hover:text-purple-300">
				REMOVE
			</button>
		</div>
	)
}

export default CartItemAllCheck
