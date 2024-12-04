import React from "react"
import { Button } from "@repo/ui/button"

interface TotalPriceProps {
	totalPrice: number
}

function CartCheckout({ totalPrice }: TotalPriceProps) {
	return (
		<div className="space-y-4 rounded-lg bg-gray-900 p-6">
			<h2 className="font-medium text-gray-200">Shopping Summary</h2>
			<div className="flex items-center justify-between border-t border-gray-800 py-4">
				<span className="text-gray-200">Total</span>
				<span className="text-xl font-medium text-purple-400">
					{totalPrice.toLocaleString()} 원
				</span>
			</div>
			<Button className="w-full bg-purple-600 hover:bg-purple-700">
				CHECKOUT
			</Button>
			<Button
				variant="link"
				className="w-full text-purple-400 hover:text-purple-300">
				Back to Shopping
			</Button>
		</div>
	)
}

export default CartCheckout
