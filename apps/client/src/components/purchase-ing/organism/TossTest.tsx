// "use client"

// import {
// 	loadTossPayments,
// 	TossPaymentsSDK,
// } from "@tosspayments/tosspayments-sdk"
// import { useEffect, useState } from "react"

// const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"

// export function TossTest() {
// 	const [payment, setPayment] = useState<TossPaymentsSDK | null>(null)
// 	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
// 		string | null
// 	>(null)
// 	const [amount, setAmount] = useState<number>(10000) // 예시 금액, 실제 금액으로 변경 필요

// 	useEffect(() => {
// 		async function fetchPayment() {
// 			try {
// 				const tossPayments = await loadTossPayments(clientKey)
// 				setPayment(tossPayments)
// 			} catch (error) {
// 				console.error("Error fetching payment:", error)
// 			}
// 		}

// 		fetchPayment()
// 	}, [])

// 	function selectPaymentMethod(method: string) {
// 		setSelectedPaymentMethod(method)
// 	}

// 	// ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
// 	async function requestPayment() {
// 		if (!payment || !selectedPaymentMethod) {
// 			console.error("Payment or selected payment method is not available.")
// 			return
// 		}

// 		try {
// 			await payment.requestPayment({
// 				method: selectedPaymentMethod, // 선택된 결제 방법
// 				amount: amount, // 결제 금액
// 				orderId: generateRandomString(), // 고유 주문번호
// 				orderName: "토스 티셔츠 외 2건",
// 				successUrl: `${window.location.origin}/payment/success`, // 결제 요청이 성공하면 리다이렉트되는 URL
// 				failUrl: `${window.location.origin}/fail`, // 결제 요청이 실패하면 리다이렉트되는 URL
// 				customerEmail: "customer123@gmail.com",
// 				customerName: "김토스",
// 			})
// 		} catch (error) {
// 			console.error("Payment request failed:", error)
// 		}
// 	}

// 	async function requestBillingAuth() {
// 		if (!payment) {
// 			console.error("Payment is not available.")
// 			return
// 		}

// 		try {
// 			await payment.requestBilling({
// 				method: "CARD", // 자동결제(빌링)은 카드만 지원합니다
// 				successUrl: `${window.location.origin}/payment/billing`, // 요청이 성공하면 리다이렉트되는 URL
// 				failUrl: `${window.location.origin}/fail`, // 요청이 실패하면 리다이렉트되는 URL
// 				customerEmail: "customer123@gmail.com",
// 				customerName: "김토스",
// 			})
// 		} catch (error) {
// 			console.error("Billing authorization request failed:", error)
// 		}
// 	}

// 	return (
// 		<div className="wrapper">
// 			<div className="box_section">
// 				<h1>일반 결제</h1>
// 				<div id="payment-method" style={{ display: "flex" }}>
// 					<button
// 						id="CARD"
// 						className={`button2 ${selectedPaymentMethod === "CARD" ? "active" : ""}`}
// 						onClick={() => selectPaymentMethod("CARD")}>
// 						카드
// 					</button>
// 				</div>
// 				<button className="button" onClick={requestPayment}>
// 					결제하기
// 				</button>
// 			</div>
// 			<div className="box_section">
// 				<h1>정기 결제</h1>
// 				<button className="button" onClick={requestBillingAuth}>
// 					빌링키 발급하기
// 				</button>
// 			</div>
// 		</div>
// 	)
// }

// function generateRandomString() {
// 	return window.btoa(Math.random().toString()).slice(0, 20)
// }
