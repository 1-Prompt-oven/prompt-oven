import { actionHandler } from "@/action/actionHandler.ts"
import type {
	GetLlmListRequestType,
	GetLlmListResponseType,
	GetLlmRequestType,
	GetLlmResponseType,
	GetLlmVersionListRequestType,
	GetLlmVersionListResponseType,
} from "@/types/product/llmType.ts"
import type { CommonResType } from "@/types/common/responseType.ts"

export const getLlmName = async (
	req: GetLlmRequestType,
): Promise<CommonResType<GetLlmResponseType>> => {
	return actionHandler<CommonResType<GetLlmResponseType>>({
		name: "getLlmName",
		url: `/v1/product/llm/${req.llmId}`,
		options: {
			method: "GET",
			cache: "no-cache",
		},
	})
}

export const getLlmList = async (
	req: GetLlmListRequestType,
): Promise<CommonResType<GetLlmListResponseType[]>> => {
	return actionHandler<CommonResType<GetLlmListResponseType[]>>({
		name: "getLlmList",
		url: `/v1/product/llm/list?llmType={req.llmType}`,
		options: {
			method: "GET",
			cache: "no-cache",
			body: JSON.stringify(req),
		},
	})
}

export const getLlmVersionList = async (
	req: GetLlmVersionListRequestType,
): Promise<CommonResType<GetLlmVersionListResponseType[]>> => {
	return actionHandler<CommonResType<GetLlmVersionListResponseType[]>>({
		name: "getLlmVersionList",
		url: `/v1/admin/product/llm/version/{req.llmId}`,
		options: {
			method: "GET",
			cache: "no-cache",
			body: JSON.stringify(req),
		},
	})
}
