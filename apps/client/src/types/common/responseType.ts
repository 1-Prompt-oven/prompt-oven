import type { SearchResultPromptType } from "@/types/search/searchResultType"

export interface CommonResType<T> {
	httpStatus: string
	isSuccess: boolean
	message: string
	code?: number
	result: T
}

export interface CommonResType2<T> {
	httpStatus: CommonResHttpStatusType
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
	productList: SearchResultPromptType[]
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

export interface BestCreatorApiResponseType {
	content: SearchResultPromptType[]
	nextCursor: number
	hasNext: boolean
	pageSize: number
	page: number
}

export interface CreateCommissionResponseType {
	commissionUuid: string
}

// pageable type
export interface PaginationResult<T> {
	totalElements: number
	totalPages: number
	first: boolean
	last: boolean
	size: number
	content: T
	number: number
	sort: Sort[]
	numberOfElements: number
	pageable: Pageable
	empty: boolean
}

interface Sort {
	direction: string
	nullHandling: string
	ascending: boolean
	property: string
	ignoreCase: boolean
}

interface Pageable {
	offset: number
	sort: Sort[]
	paged: boolean
	pageNumber: number
	pageSize: number
	unpaged: boolean
}
