import React from "react"

interface PaymentDetailTotalItemProps {
	count: number
}

export default function PaymentDetailTotalItem({
	count,
}: PaymentDetailTotalItemProps) {
	return (
		<p className="flex justify-between text-sm text-[#9e9e9e]">
			<span>Total Item</span>
			<span className="text-black">x {count}</span>
		</p>
	)
}
