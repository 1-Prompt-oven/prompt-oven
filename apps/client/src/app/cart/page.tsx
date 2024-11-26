import React from "react"
import type { CartItemType } from "@/types/cart/cartTypes"
import { getCartData } from "@/action/cart/getCartData"
import { calculateTotalPrice } from "@/action/cart/cartDataAction"
import CartItemContainer from "@/components/cart/organism/CartItemContainer"
import CartCheckout from "@/components/cart/organism/CartCheckout"

async function cart() {
	const items: CartItemType[] = await getCartData()
	// 추후 uuid 가지고 상품 데이터 가져와서 만든 최종 사용자 장바구니 데이터를 items 에 재할당해서
	// 컴포넌트에 내려줘야 함.

	const selectedItemsTotalPrice = await calculateTotalPrice(items)

	return (
		<main className="min-h-screen bg-black p-6">
			<div className="mx-auto max-w-6xl">
				<h1 className="mb-6 text-2xl font-bold text-white">My Cart</h1>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<CartItemContainer items={items} />
					</div>
					<CartCheckout totalPrice={selectedItemsTotalPrice} />
				</div>
			</div>
		</main>
	)
}

export default cart
