import PaymentTitle from "../atom/PaymentTitle"
import type methodGroup from "../atom/icon/MethodGroup"
import PaymentOrderNone from "../molecule/PaymentOrderNone"
import PaymentProceed from "./PaymentProceed"

interface SelectedMethod {
	type: keyof typeof methodGroup // methodGroup 객체의 키 중 하나를 선택할 수 있는 타입
	payment?: string // 선택된 결제 방법
}

interface PaymentOrderProps {
	method: SelectedMethod // selectedMethod를 props로 받음
	totalOrder: number
	totalPrice: number
}

export default function PaymentOrder({
	method,
	totalOrder,
	totalPrice,
}: PaymentOrderProps) {
	return (
		<div className="flex h-full w-[350px] flex-col gap-4 rounded-md bg-white p-4 text-sm">
			<PaymentTitle title="Message" />
			<textarea
				name="message"
				placeholder="Leave a message"
				className="h-[130px] resize-none rounded-lg border border-[#d8d8d8] p-3"
			/>

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

			{method.payment ? (
				<PaymentProceed method={method.payment} />
			) : (
				<PaymentOrderNone />
			)}
		</div>
	)
}
