export interface QueryParams {
	view: string | undefined
}

export interface SearchParams {
	searchParams: QueryParams
}

export interface AccountQueryParams extends CreateProductQueryParams {
	view: string | undefined
}

export interface AccountSearchParams {
	searchParams: AccountQueryParams
}

// 등록할 상품의 타입 (text, image)
export type CreateProductType = "text" | "image"
export interface CreateProductQueryParams {
	step?: string
	productUuid?: string
	llmType?: CreateProductType
	llmId?: string
	productName?: string
}
// ------------------------------ End of SearchParams ------------------------------
