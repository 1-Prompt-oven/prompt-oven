import React from "react"

interface PromptPriceProps {
	price: number
}

export default function PromptPrice({ price }: PromptPriceProps) {
	return (
		<p className="font-lato flex items-center gap-1 !text-base text-white">
			<span className="text-sm">₩</span>
			<span>{price.toLocaleString()}</span>
		</p>
	)
}
