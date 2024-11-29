import React from "react"

interface PaymentLastCheckValueProps {
	totalOrder: number
	totalPrice: number
}

export default function PaymentLastCheckValue({
	totalOrder,
	totalPrice,
}: PaymentLastCheckValueProps) {
	return (
		<div className="flex flex-col gap-3 border-t-2 border-black pt-4 font-semibold">
			<div className="flex justify-between">
				<p>Total Order</p>
				<p className="flex gap-2">x{totalOrder} Product</p>
			</div>
			<div className="flex justify-between">
				<p>Total Payment</p>
				<p className="flex gap-4">
					<span className="text-xl font-bold text-[#9747ff]">
						${totalPrice}
					</span>
				</p>
			</div>
		</div>
	)
}
