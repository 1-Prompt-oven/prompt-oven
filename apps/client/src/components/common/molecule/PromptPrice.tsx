import React from "react"

interface PromptPriceProps {
	price: number
}

export default function PromptPrice({ price }: PromptPriceProps) {
	return (
		<span className="font-lato !text-base text-white">
			{price.toLocaleString()}$
		</span>
	)
}
