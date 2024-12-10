import Link from "next/link"
import { Button } from "@repo/ui/button"
import CartExpected from "../atom/CartExpected"

interface TotalPriceProps {
	totalPrice: number
	onCheckout: () => void
}

function CartCheckout({ totalPrice, onCheckout }: TotalPriceProps) {
	const discount = 0

	return (
		<div className="mb-4 h-full space-y-6 rounded-lg bg-gray-900 p-6 lg:w-[300px] xl:w-[350px]">
			<div className="space-y-4">
				<h2 className="text-base font-semibold text-gray-200">
					<span>주문 예상 금액</span>
				</h2>

				{/* 결제 금액 계산 */}
				<div className="flex flex-col gap-2 border-t border-gray-800 pt-4">
					<CartExpected title="총 상품 가격" price={totalPrice} />
					<CartExpected title="총 할인" price={discount} />
				</div>

				{/* 최종 결제 금액 */}
				<div className="border-t border-gray-800 pt-4">
					<CartExpected
						title="결제 금액"
						price={totalPrice - discount}
						fontSize="text-lg"
					/>
				</div>
			</div>

			{/* Link 버튼 */}
			<div className="flex flex-col items-center gap-4">
				<Button
					className="w-full bg-purple-600 hover:bg-purple-700"
					onClick={onCheckout}>
					<span className="font-semibold">구매하기</span>
				</Button>
				<Link
					href="/prompts"
					className="hover:bg-purple-500/10 w-full text-center text-purple-400 hover:text-purple-300">
					<span className="font-semibold">상품 추가하기</span>
				</Link>
			</div>
		</div>
	)
}

export default CartCheckout
