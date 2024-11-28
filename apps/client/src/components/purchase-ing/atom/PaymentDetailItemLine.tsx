import React from "react"

interface PaymentDetailLineProps {
	uuid: string
	name: string
	price: string
}

export default function PaymentDetailItemLine({
	uuid,
	name,
	price,
}: PaymentDetailLineProps) {
	return (
		<p className="flex justify-between text-sm text-[#9e9e9e]">
			<input
				type="hidden"
				name="purchaseList"
				value={JSON.stringify({
					productUUID: uuid,
					productName: name,
					productPrice: price,
				})}
			/>
			<span>{name}</span>
			<span className="text-black">${price}</span>
		</p>
	)
}
