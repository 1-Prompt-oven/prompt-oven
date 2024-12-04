import type { PromptsType } from "../prompts/promptsType"

export interface CommonResType<T> {
	httpStatus: string
	isSuccess: boolean
	message: string
	code?: number
	result: T
}
export interface CommonResHttpStatusType {
	error: boolean
	is4xxClientError: boolean
	is5xxServerError: boolean
	is1xxInformational: boolean
	is2xxSuccessful: boolean
	is3xxRedirection: boolean
}

export interface PromptApiResponseType {
	productList: PromptsType[]
	nextCursorId: string
	hasNext: boolean
}

export interface CartItemApiResponseType {
	id: number
	memberUuid: string
	productUuid: string
	selected: boolean
	deleted?: boolean
}

export interface S3ResponseType {
	isSuccess: boolean
	responseImageUrl: string | undefined
}