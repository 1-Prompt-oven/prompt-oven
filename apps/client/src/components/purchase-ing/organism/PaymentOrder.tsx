import PaymentMessageArea from "../PaymentMessageArea"
import PaymentTitle from "../atom/PaymentTitle"
import type methodGroup from "../atom/icon/MethodGroup"
import PaymentLastCheckValue from "../molecule/PaymentLastCheckValue"
import PaymentOrderNone from "../molecule/PaymentOrderNone"
import PaymentProceed from "../molecule/PaymentProceed"

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
			<PaymentMessageArea comment="Leave a message" />

			<PaymentLastCheckValue totalOrder={totalOrder} totalPrice={totalPrice} />

			{method.payment ? (
				<PaymentProceed method={method.payment} />
			) : (
				<PaymentOrderNone />
			)}
		</div>
	)
}
