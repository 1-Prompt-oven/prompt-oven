import React from "react"

interface PromptDetailTotalPriceProps {
	name: string
	price: number
}

export default function PromptDetailTotalPrice({
	name,
	price,
}: PromptDetailTotalPriceProps) {
	return (
		<p className="flex justify-between py-4 text-sm">
			<span className="text-black">{name}</span>
			<span className="text-[#9747ff]">${price}</span>
		</p>
	)
}
