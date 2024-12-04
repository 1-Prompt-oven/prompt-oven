import React from "react"
import { Button } from "@repo/ui/button"

interface TotalPriceProps {
	totalPrice: number
}

function CartCheckout({ totalPrice }: TotalPriceProps) {
	return (
		<div className="space-y-6 rounded-lg bg-gray-900 p-6">
			<div className="space-y-4">
				<h2 className="text-base font-medium text-gray-200">
					Shopping Summary
				</h2>
				<div className="flex items-center justify-between border-t border-gray-800 pt-4">
					<span className="text-sm text-purple-300">Total</span>
					<span className="text-lg font-semibold text-purple-400">
						{totalPrice.toLocaleString()} 원
					</span>
				</div>
			</div>
			<div className="space-y-3">
				<Button className="w-full bg-purple-600 hover:bg-purple-700">
					CHECKOUT
				</Button>
				<Button
					variant="ghost"
					className="w-full text-purple-400 hover:bg-purple-500/10 hover:text-purple-300">
					Back to Shopping
				</Button>
			</div>
		</div>
	)
}

export default CartCheckout

