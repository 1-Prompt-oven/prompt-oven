"use server"

import type {
	GetSellerRequestType,
	GetSellerResponseType,
	RegisterSellerRequestType,
} from "@/types/settlement/settlementType.ts"
import { actionHandler } from "@/action/actionHandler.ts"
import type { CommonResType } from "@/types/common/responseType.ts"
import { getAccessToken, getMemberUUID } from "@/lib/api/sessionExtractor.ts"
import { initializeHeaders } from "@/lib/api/headers.ts"

export const registerSeller = async (
	req: Omit<RegisterSellerRequestType, "memberID">,
) => {
	"use server"
	const accessToken = await getAccessToken()
	const memberID = await getMemberUUID()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType<object>>({
		name: "registerSeller",
		url: "/v1/member/settlement/profile",
		options: {
			headers,
			method: "POST",
			body: JSON.stringify({ ...req, memberID }),
			cache: "no-cache",
		},
	})
}

export const getSellerProfile = async (req: GetSellerRequestType) => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType<GetSellerResponseType[]>>({
		name: "getSettlementProfile",
		url: `/v1/seller/settlement/profile/list/${req.memberUUID}`,
		options: {
			headers,
			method: "GET",
			cache: "no-cache",
		},
	})
}
