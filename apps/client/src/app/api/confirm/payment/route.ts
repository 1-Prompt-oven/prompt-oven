import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const apiSecretKey = "test_sk_GjLJoQ1aVZ9WZN6WXaDg3w6KYe2R"
const encryptedApiSecretKey = `Basic ${Buffer.from(`${apiSecretKey}:`).toString("base64")}`

export async function POST(request: NextRequest) {
	const { paymentKey, orderId, amount } = await request.json()

	// 결제 승인 API를 호출합니다.
	const response = await fetch(
		"https://api.tosspayments.com/v1/payments/confirm",
		{
			method: "POST",
			headers: {
				Authorization: encryptedApiSecretKey, // 이 값을 적절히 설정해야 합니다.
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				orderId,
				amount,
				paymentKey,
			}),
		},
	)

	const result = await response.json()

	if (!response.ok) {
		// 결제 승인 실패 비즈니스 로직을 구현합니다.
		return NextResponse.json(result, { status: response.status })
	}

	// 결제 완료 비즈니스 로직을 구현합니다.
	return NextResponse.json(result, { status: response.status })
}
