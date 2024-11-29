"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { RequestPaymentType } from "@/types/purchase.ts/purchase-ongoing"

interface RequestData {
	orderId: string | null
	amount: string | null
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
		paymentList: string // JSON 문자열로 저장
	}

	message: string
	code?: string // code 속성을 추가
}

export function SuccessPage() {
	const searchParams = useSearchParams()
	const [responseData, setResponseData] = useState<ResponseData | null>(null)

	useEffect(() => {
		async function confirm() {
			const orderId = searchParams.get("orderId")
			const amount = searchParams.get("amount")
			const paymentKey = searchParams.get("paymentKey")

			const requestData: RequestData = {
				orderId,
				amount,
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

				// eslint-disable-next-line no-console -- Check Error
				console.log(
					"errorCode : ",
					errorCode,
					"\nerrorMessage : ",
					errorMessage,
				)
			} else {
				// 성공적인 응답 처리
				setResponseData(json)

				const payload: RequestPaymentType = {
					memberUUID: "1",
					orderId: json.orderId,
					orderName: json.orderName,
					requestedAt: json.requestedAt,
					approvedAt: json.approvedAt,
					paymentWay: json.method,
					paymentMethod: json.easyPay.provider,
					totalAmount: json.easyPay.amount,
					message: json.metadata.message,
					purchaseList: JSON.parse(json.metadata.paymentList),
				}

				// eslint-disable-next-line no-console -- This is a  payload
				console.log("payload --> ", payload)
			}
		}

		confirm()
	}, [searchParams])

	return (
		<div className="text-white">
			<div
				className="box_section"
				style={{ width: "600px", textAlign: "left" }}>
				<b>Response Data :</b>
				<div id="response" style={{ whiteSpace: "initial" }}>
					{responseData ? (
						<pre>{JSON.stringify(responseData, null, 4)}</pre>
					) : null}
				</div>
			</div>
		</div>
	)
}
