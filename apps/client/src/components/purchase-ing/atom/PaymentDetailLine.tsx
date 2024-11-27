import React from "react"

interface PaymentDetailLineProps {
	name: string
	price: string
}

export default function PaymentDetailLine({
	name,
	price,
}: PaymentDetailLineProps) {
	return (
		<p className="flex justify-between text-sm text-[#9e9e9e]">
			<span>{name}</span>
			<span className="text-black">${price}</span>
		</p>
	)
}
