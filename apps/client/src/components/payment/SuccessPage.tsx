"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

interface RequestData {
	orderId: string | null
	amount: string | null
	paymentKey: string | null
}

interface ResponseData {
	success: boolean
	data?: {
		transactionId: string
		status: string
		amount: number
		orderId: string
	}
	message: string
	code?: string // code 속성을 추가
}

export function SuccessPage() {
	const navigate = useRouter()
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
			}

			// 성공적인 응답 처리
			setResponseData(json)
		}

		confirm()
	}, [searchParams, navigate])

	return (
		<div className="text-white">
			<div className="box_section" style={{ width: "600px" }}>
				<h2>결제를 완료했어요</h2>
				<div className="p-grid typography--p" style={{ marginTop: "50px" }}>
					<div className="p-grid-col text--left">
						<b>결제금액</b>
					</div>
					<div className="p-grid-col text--right" id="amount">
						{`${Number(searchParams.get("amount")).toLocaleString()}원`}
					</div>
				</div>
				<div className="p-grid typography--p" style={{ marginTop: "10px" }}>
					<div className="p-grid-col text--left">
						<b>주문번호</b>
					</div>
					<div className="p-grid-col text--right" id="orderId">
						{`${searchParams.get("orderId")}`}
					</div>
				</div>
				<div className="p-grid typography--p" style={{ marginTop: "10px" }}>
					<div className="p-grid-col text--left">
						<b>paymentKey</b>
					</div>
					<div
						className="p-grid-col text--right"
						id="paymentKey"
						style={{ whiteSpace: "initial", width: "250px" }}>
						{`${searchParams.get("paymentKey")}`}
					</div>
				</div>
			</div>
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

// Suspense 경계를 추가하여 useSearchParams()를 감싸는 부분
export default function PageWrapper() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SuccessPage />
		</Suspense>
	)
}
