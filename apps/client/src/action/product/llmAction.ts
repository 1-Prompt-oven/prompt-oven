"use server"

import { actionHandler } from "@/action/actionHandler.ts"
import type {
	GetLlmListRequestType,
	GetLlmListResponseType,
	GetLlmRequestType,
	GetLlmResponseType,
	GetLlmVersionListRequestType,
	GetLlmVersionListResponseType,
} from "@/types/product/llmType.ts"
import type { CommonResType2 } from "@/types/common/responseType.ts"
import { getAccessToken } from "@/lib/api/sessionExtractor.ts"
import { initializeHeaders } from "@/lib/api/headers.ts"

export const getLlmName = async (req: GetLlmRequestType) => {
	"use server"
	return actionHandler<CommonResType2<GetLlmResponseType>>({
		name: "getLlmName",
		url: `/v1/product/llm/${req.llmId}`,
		options: {
			method: "GET",
			cache: "no-cache",
		},
	})
}

export const getLlmList = async (req: GetLlmListRequestType) => {
	"use server"
	return actionHandler<CommonResType2<GetLlmListResponseType[]>>({
		name: "getLlmList",
		url: `/v1/product/llm/list${req.llmType ? `?llmType=${req.llmType}` : ""}`,
		options: {
			method: "GET",
			cache: "no-cache",
		},
	})
}

export const getLlmVersionList = async (req: GetLlmVersionListRequestType) => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType2<GetLlmVersionListResponseType[]>>({
		name: "getLlmVersionList",
		url: `/v1/product/llm/version/${req.llmId}`,
		options: {
			headers,
			method: "GET",
			cache: "no-cache",
		},
	})
}
