import React from "react"

interface CartExpectedProps {
	title: string
	count: number
	fontSize?: string
}

export default function CartCount({
	title,
	count,
	fontSize = "text-md",
}: CartExpectedProps) {
	return (
		<div className="flex items-center justify-between gap-1">
			<p className="text-sm text-purple-300">
				<span className="font-semibold">{title}</span>
			</p>
			<p
				className={`${fontSize} text-md flex items-center gap-1 font-semibold text-purple-400`}>
				<span className="text-sm">x</span>
				<span>{count.toLocaleString()}</span>
			</p>
		</div>
	)
}
