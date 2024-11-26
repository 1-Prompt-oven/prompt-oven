import React from "react"

interface PurchaseEdPriceProps {
	productPrice: number
}

export default function PurchaseEdPrice({
	productPrice,
}: PurchaseEdPriceProps) {
	return (
		<span className="font-lato absolute bottom-2 right-3 ml-1 mt-0 !text-base text-white">
			{productPrice.toLocaleString()}$
		</span>
	)
}
