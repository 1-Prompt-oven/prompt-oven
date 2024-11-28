import { useEffect, useState } from "react"
import { loadTossPayments } from "@tosspayments/tosspayments-sdk"
import type { TossPaymentsPayment } from "@tosspayments/tosspayments-sdk"
import { Button } from "@repo/ui/button"

const clientKey = "test_ck_AQ92ymxN341bBABy0aB0VajRKXvd"

const amount = {
	currency: "KRW",
	value: 50000,
}

// 결제 방법을 정의하는 타입
type PaymentMethod =
	| "CARD"
	| "TRANSFER"
	| "VIRTUAL_ACCOUNT"
	| "MOBILE_PHONE"
	| "CULTURE_GIFT_CERTIFICATE"
	| "FOREIGN_EASY_PAY"

const generateRandomString = (length = 20) => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	let result = ""
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length)
		result += characters[randomIndex]
	}
	return result
}

const customerKey = generateRandomString()

export default function PaymentTest({ method }: { method: PaymentMethod }) {
	const [payment, setPayment] = useState<TossPaymentsPayment | null>(null) // 초기값을 null로 설정

	const selectedPaymentMethod: PaymentMethod = method

	useEffect(() => {
		async function fetchPayment() {
			const tossPayments = await loadTossPayments(clientKey)

			// 회원 결제
			const paymentInstance = tossPayments.payment({
				customerKey,
			})

			setPayment(paymentInstance)
		}

		fetchPayment()
	}, [])

	// ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
	async function requestPayment() {
		if (!payment) {
			// eslint-disable-next-line no-console -- Payment instance is not initialized.
			console.error("Payment instance is not initialized.")
			return
		}

		// 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
		// 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
		switch (selectedPaymentMethod) {
			case "CARD":
				await payment.requestPayment({
					method: "CARD", // 카드 및 간편결제
					amount,
					orderId: generateRandomString(), // 고유 주문번호
					orderName: "토스 티셔츠 외 2건",
					successUrl: `${window.location.origin}/payment/success`, // 결제 요청이 성공하면 리다이렉트되는 URL
					failUrl: `${window.location.origin}/fail`, // 결제 요청이 실패하면 리다이렉트되는 URL
					customerEmail: "customer123@gmail.com",
					customerName: "김토스",
					card: {
						useEscrow: false,
						flowMode: "DEFAULT",
						useCardPoint: false,
						useAppCardOnly: false,
					},
				})
				break // break 추가
			case "TRANSFER":
				await payment.requestPayment({
					method: "TRANSFER", // 계좌이체 결제
					amount,
					orderId: generateRandomString(),
					orderName: "토스 티셔츠 외 2건",
					successUrl: `${window.location.origin}/payment/success`,
					failUrl: `${window.location.origin}/fail`,
					customerEmail: "customer123@gmail.com",
					customerName: "김토스",
					transfer: {
						cashReceipt: {
							type: "소득공제",
						},
						useEscrow: false,
					},
				})
				break // break 추가
			case "VIRTUAL_ACCOUNT":
				await payment.requestPayment({
					method: "VIRTUAL_ACCOUNT", // 가상계좌 결제
					amount,
					orderId: generateRandomString(),
					orderName: "토스 티셔츠 외 2건",
					successUrl: `${window.location.origin}/payment/success`,
					failUrl: `${window.location.origin}/fail`,
					customerEmail: "customer123@gmail.com",
					customerName: "김토스",
					virtualAccount: {
						cashReceipt: {
							type: "소득공제",
						},
						useEscrow: false,
						validHours: 24,
					},
				})
				break // break 추가
			case "MOBILE_PHONE":
				await payment.requestPayment({
					method: "MOBILE_PHONE", // 휴대폰 결제
					amount,
					orderId: generateRandomString(),
					orderName: "토스 티셔츠 외 2건",
					successUrl: `${window.location.origin}/payment/success`,
					failUrl: `${window.location.origin}/fail`,
					customerEmail: "customer123@gmail.com",
					customerName: "김토스",
				})
				break // break 추가
			case "CULTURE_GIFT_CERTIFICATE":
				await payment.requestPayment({
					method: "CULTURE_GIFT_CERTIFICATE", // 문화상품권 결제
					amount,
					orderId: generateRandomString(),
					orderName: "토스 티셔츠 외 2건",
					successUrl: `${window.location.origin}/payment/success`,
					failUrl: `${window.location.origin}/fail`,
					customerEmail: "customer123@gmail.com",
					customerName: "김토스",
				})
				break // break 추가
			case "FOREIGN_EASY_PAY":
				await payment.requestPayment({
					method: "FOREIGN_EASY_PAY", // 해외 간편결제
					amount: {
						value: 100,
						currency: "USD",
					},
					orderId: generateRandomString(),
					orderName: "토스 티셔츠 외 2건",
					successUrl: `${window.location.origin}/payment/success`,
					failUrl: `${window.location.origin}/fail`,
					customerEmail: "customer123@gmail.com",
					customerName: "김토스",
					foreignEasyPay: {
						provider: "PAYPAL", // PayPal 결제
						country: "KR",
					},
				})
				break // break 추가
			default:
				// eslint-disable-next-line no-console -- Invalid payment method selected.
				console.error("Invalid payment method selected.")
		}
	}

	return (
		<Button
			type="button"
			className="bg-[#9747ff] text-white hover:bg-[#743dbd]"
			onClick={() => requestPayment()}>
			<span>Order Now</span>
		</Button>
	)
}
