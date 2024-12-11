import React from "react"

interface PriceDisplayProps {
	price: number
}

function PriceDisplay({ price }: PriceDisplayProps) {
	return (
		<div className="space-y-1">
			<h2 className="text-lg font-semibold text-white">Price</h2>
			<p className="text-2xl font-bold text-purple-400">
				${price.toLocaleString()}
			</p>
		</div>
	)
}

export default PriceDisplay
