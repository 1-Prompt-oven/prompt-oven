"use client"

import React, { useState, useEffect } from "react"
import { ShoppingCart } from "@repo/ui/lucide"
import { cartData } from "@/action/cart/cartAction"
import BadgeContainer from "@/components/common/atom/BadgeContainer.tsx"
import type { CartItemType } from "@/types/cart/cartTypes"

function CartCountBadge({ userAuth }: { userAuth: string }) {
	const [cartCount, setCartCount] = useState<number>(0)

	useEffect(() => {
		const fetchCartData = async () => {
			if (userAuth === "guest") {
				return
			}
			const cartItems: CartItemType[] = await cartData()
			const activeItems = cartItems.filter((item) => !item.deleted)
			setCartCount(activeItems.length)
		}

		fetchCartData()
	}, [])

	return (
		<BadgeContainer count={cartCount}>
			<ShoppingCart className="!h-7 !w-7 text-po-gray-150" strokeWidth={2} />
		</BadgeContainer>
	)
}
export default CartCountBadge
