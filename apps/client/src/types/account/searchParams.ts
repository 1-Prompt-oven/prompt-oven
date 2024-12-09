export interface QueryParams {
	view: string | undefined
}

export interface SearchParams {
	searchParams: QueryParams
}

export interface AccountQueryParams
	extends CreateProductQueryParams,
		ProductListSearchParams {
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

// GetSellerProductListRequestType에서 sellerUuid를 제외한 나머지 필드
export interface ProductListSearchParams {
	searchBar?: string // 검색어 (query)
	sortOption?: "price" | "sells" | "createdAt" // 정렬 기준 price, sells, createdAt(default) (query)
	sortBy?: "ASC" | "DESC" // 정렬 방향 ASC, DESC(default) (query)
	enable?: string // 상품 판매 여부 true(default), false (query)
	temporary?: string // 임시 등록 여부 true(default), false (query)
	page?: string // 페이지 번호 (query) default: 0
	size?: string // 페이지 사이즈 (query) default: 16
}

// ------------------------------ End of SearchParams ------------------------------
