import React from "react"

interface PromptPriceProps {
	price: number
}

export default function PromptPrice({ price }: PromptPriceProps) {
	return (
		<p className="font-lato bottom-2 text-balance pr-2 text-white">
			{price.toLocaleString()}$
		</p>
	)
}
