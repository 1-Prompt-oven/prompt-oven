"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createCookiePayment } from "@/action/cookie/cookiePaymentAction"
import SuccessLinkPage from "./CookieSuccessLinkPage"

interface RequestData {
	orderId: string | null
	amount: number | null
	paymentKey: string | null
}

interface ResponseData {
	success: boolean
	transactionId: string
	status: string
	orderId: string
	orderName: string
	requestedAt: string
	approvedAt: string
	method: string
	easyPay: {
		provider: string
		amount: number
	}
	metadata: {
		message: string
	}
	message: string
	code?: string // code 속성을 추가
}

export function CookieSuccessPage() {
	const searchParams = useSearchParams()
	const [errorCount, setErrorCount] = useState<number>(0)

	useEffect(() => {
		async function confirm() {
			const orderId = searchParams.get("orderId")
			const amount = searchParams.get("amount")
			const paymentKey = searchParams.get("paymentKey")

			const requestData: RequestData = {
				orderId,
				amount: Number(amount),
				paymentKey,
			}

			const response = await fetch("/api/confirm/payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			})
			const json: ResponseData = await response.json()
			if (!response.ok) {
				// API 응답이 실패한 경우
				const errorCode = json.code || "UNKNOWN_ERROR" // json.code가 없을 경우 기본값 설정
				const errorMessage = json.message || "Unknown error" // json.message가 없을 경우 기본값 설정

				if (errorCount < 1) setErrorCount(errorCount + 1)
				else {
					//연결이 1회 실패 시, 에러 페이지로 이동
					// eslint-disable-next-line no-console -- Check Error
					console.log(
						"errorCode : ",
						errorCode,
						"\nerrorMessage : ",
						errorMessage,
					)
				}
			} else {
				await createCookiePayment({
					totalAmount: json.easyPay.amount,
					cookieAmount: json.easyPay.amount / 100,
					message: "",
					orderId: json.orderId,
					orderName: json.orderName,
					paymentWay: json.method,
					paymentMethod: json.easyPay.provider,
				})
			}
		}
		confirm()
	}, [searchParams, errorCount])

	return <SuccessLinkPage />
}
