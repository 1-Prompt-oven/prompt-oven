"use server"
import { initializeHeaders } from "@/lib/api/headers"
import { getAccessToken, getMemberUUID } from "@/lib/api/sessionExtractor"
import type { CreateCookiePaymentRequest } from "@/types/cookie/cookiePaymentType"
import { actionHandlerNoresponse } from "../actionHandler"

export const createCookiePayment = async (
	paymentData: CreateCookiePaymentRequest,
): Promise<undefined> => {
	const userUuid = await getMemberUUID()
	if (!userUuid) {
		throw new Error("Unable to fetch user UUID")
	}

	const queryParams = new URLSearchParams({
		memberUuid: userUuid,
	}).toString()

	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	const body = {
		memberUuid: userUuid,
		cookieAmount: paymentData.cookieAmount,
		totalAmount: paymentData.cookieAmount,
		message: "",
		orderId: paymentData.orderId,
		orderName: paymentData.orderName,
		paymentMethod: paymentData.paymentMethod,
		paymentWay: paymentData.paymentWay,
	}
	await actionHandlerNoresponse<undefined>({
		name: "createCookiePayment",
		url: `/v1/payment/cookie?${queryParams}`,
		options: {
			method: "POST",
			headers,
			body: JSON.stringify(body),
		},
	})
}
