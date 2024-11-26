import React from "react"

interface TotalPriceProps {
	totalPrice: number
}

function CartCheckout({ totalPrice }: TotalPriceProps) {
	return <>{totalPrice}</>
}

export default CartCheckout
