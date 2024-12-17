"use server"
import { revalidateTag } from "next/cache"
import { initializeHeaders } from "@/lib/api/headers"
import { getAccessToken, getMemberUUID } from "@/lib/api/sessionExtractor"
import { getKoreanTime } from "@/lib/utils"
import type { CommonResType } from "@/types/common/responseType"
import type {
	CookieLatestType,
	GetCookieListRequestType,
	GetCookieListResponseType,
} from "@/types/cookie/cookieResponseType"
import { actionHandler } from "../actionHandler"

export const getCookieList = async (
	req: GetCookieListRequestType,
): Promise<CommonResType<GetCookieListResponseType>> => {
	"use server"

	const userUuid = await getMemberUUID()
	if (!userUuid) {
		throw new Error("Unable to fetch user UUID")
	}
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	const queryParams = new URLSearchParams({
		memberUuid: userUuid,
		startDate: req.startDate || "",
		endDate: req.endDate || "",
		paymentType: req.paymentType || "",
		lastId: req.lastId || "",
		pageSize: req.pageSize?.toString() || "",
	}).toString()

	return actionHandler<CommonResType<GetCookieListResponseType>>({
		name: "getcookieList",
		url: `/v1/member/cookie?${queryParams}`,
		options: {
			headers,
			method: "GET",
			// cache: "no-cache",
		},
	})
}

export const getCookieLatest = async (): Promise<CookieLatestType> => {
	"use server"

	const userUuid = await getMemberUUID()
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)

	if (!userUuid) {
		//	throw new Error("Unable to fetch user UUID")
		return { isUser: false, count: 0 }
	}

	const queryParams = new URLSearchParams({
		memberUuid: userUuid,
	}).toString()

	const cookieLatest = await actionHandler<CommonResType<number>>({
		name: "getcookieLatest",
		url: `/v1/member/cookie/latest?${queryParams}`,
		options: {
			headers,
			method: "GET",
			next: { tags: ["changeCookie"] },
		},
	})

	return { isUser: true, count: cookieLatest.result }
}

export const deductCookieAction = async (): Promise<boolean> => {
	"use server"

	const userUuid = await getMemberUUID()
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)

	if (!userUuid) {
		//	throw new Error("Unable to fetch user UUID")
		return false
	}

	const payload = {
		memberUuid: userUuid,
		cookieAmount: 1,
		approvedAt: getKoreanTime(),
	}

	const res = await actionHandler<CommonResType<Record<string, never>>>({
		name: "deductCookie",
		url: `/v1/member/cookie`,
		options: {
			headers,
			method: "POST",
			body: JSON.stringify(payload),
		},
	})

	if (!res.isSuccess) return false

	revalidateTag("changeCookie")
	return true
}

