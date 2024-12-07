import type { Sort, SortDirection } from "@/types/seller/sellerProduct.ts"

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

export interface ProductListSearchParams {
	sortOption?: Sort
	searchBar?: string
	sortBy?: SortDirection
	enable?: boolean
	temporary?: boolean
	cursorId?: string
	pageSize?: string // number type string
}

// ------------------------------ End of SearchParams ------------------------------
