import React from "react"

interface PromptPriceProps {
	price: number
}

export default function PromptPrice({ price }: PromptPriceProps) {
	return (
		<span className="font-lato absolute bottom-2 right-3 ml-1 mt-0 !text-base text-white">
			{price.toLocaleString()}$
		</span>
	)
}
