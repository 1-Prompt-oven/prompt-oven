import React from "react"

interface PromptPriceProps {
	price: number
}

export default function PromptPrice({ price }: PromptPriceProps) {
	return (
		<p className="font-lato xxs:!text-base flex items-center gap-1 text-xs text-white">
			<span className="xxs:!text-sm text-xs">₩</span>
			<span>{price.toLocaleString()}</span>
		</p>
	)
}
