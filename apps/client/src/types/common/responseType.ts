import type { PromptsType } from "../prompts/promptsType"

export interface CommonResType<T = Record<string, never>> {
	httpStatus: string
	isSuccess: boolean
	message: string
	code: number
	result: T
}

export interface ProductApiResponseType {
	productList: PromptsType[]
	nextCursorId: string
	hasNext: boolean
}

export interface CartItemApiResponseType {
	memberUuid: string
	productUuid: string
	selected: boolean
	deleted?: boolean
}
