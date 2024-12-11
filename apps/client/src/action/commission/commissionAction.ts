"use server"
import { getAccessToken } from "@/lib/api/sessionExtractor.ts"
import { actionHandler } from "@/action/actionHandler"
import { initializeHeaders } from "@/lib/api/headers"
import type {
	CommonResType,
	CreateCommissionResponseType,
	CreateCommissionRequestType,
} from "@/types/common/responseType"

export const createCommission = async (req: CreateCommissionRequestType) => {
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType<CreateCommissionResponseType>>({
		name: "createCommission",
		url: "/v1/member/commission",
		options: {
			headers,
			method: "POST",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}
