import { useState } from "react"
import type { PaymentItemType } from "@/types/purchase.ts/purchase-ongoing"
import type methodGroup from "../atom/icon/MethodGroup"
import PaymentMessageArea from "../PaymentMessageArea"
import PaymentTitle from "../atom/PaymentTitle"
import PaymentLastCheckValue from "../molecule/PaymentLastCheckValue"
import PaymentOrderNone from "../molecule/PaymentOrderNone"
import PaymentProceed from "../molecule/PaymentProceed"

interface SelectedMethod {
	type: keyof typeof methodGroup // methodGroup 객체의 키 중 하나를 선택할 수 있는 타입
	payment?: string // 선택된 결제 방법
}

interface PaymentOrderProps {
	method: SelectedMethod // selectedMethod를 props로 받음
	paymentList: PaymentItemType[]
	totalPrice: number
}

export default function PaymentOrder({
	method,
	paymentList,
	totalPrice,
}: PaymentOrderProps) {
	const [message, setMessage] = useState<string>("X")

	let orderName
	if (paymentList.length > 1)
		orderName = `${paymentList[0].productName} 외 ${paymentList.length - 1}건`
	else if (paymentList.length === 1) orderName = paymentList[0].productName
	else ""

	let content
	if (method.payment) {
		if (paymentList.length > 4) {
			content = <PaymentOrderNone state={3} />
		} else if (paymentList.length > 0) {
			content = (
				<PaymentProceed
					method={method.payment}
					orderName={orderName ? orderName : ""}
					totalPrice={totalPrice}
					paymentList={paymentList}
					message={message ? message : "X"}
				/>
			)
		} else {
			content = <PaymentOrderNone state={1} />
		}
	} else {
		content = <PaymentOrderNone state={2} />
	}

	return (
		<div className="flex h-full w-[350px] flex-col gap-4 rounded-md bg-white p-4 text-sm">
			<PaymentTitle title="Message" />
			<PaymentMessageArea
				comment="Leave a message"
				onMessageChange={setMessage}
			/>
			<PaymentLastCheckValue
				totalOrder={paymentList.length}
				totalPrice={totalPrice}
			/>
			{content}
		</div>
	)
}
