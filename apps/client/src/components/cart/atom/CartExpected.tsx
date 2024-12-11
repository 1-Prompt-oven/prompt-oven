import React from "react"

interface CartExpectedProps {
	title: string
	price: number
	fontSize?: string
}

export default function CartExpected({
	title,
	price,
	fontSize = "text-md",
}: CartExpectedProps) {
	return (
		<div className="flex items-center justify-between gap-1">
			<p className="text-sm text-purple-300">
				<span className="font-semibold">{title}</span>
			</p>
			<p
				className={`${fontSize} text-md flex items-center gap-1 font-semibold text-purple-400`}>
				<span className="mt-1 text-sm">₩</span>
				<span>{price.toLocaleString()}</span>
			</p>
		</div>
	)
}
