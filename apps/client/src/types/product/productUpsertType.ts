// -- Components type definitions
export interface TextPromptSampleContentType {
	id: string
	name: string
	value: Record<string, string>
	result: string
}
export interface ImagePromptSampleContentType {
	id: string
	name: string
	value: Record<string, string>
	result: File
}

// -- zod schema type definitions
export interface PcLlmIdType {
	llmId: number
	name: string
}
export interface PcTopCategoryType {
	topCategoryUuid: string
	topCategoryName: string
}
export interface PcSubCategoryType {
	subCategoryUuid: string
	subCategoryName: string
}

// -- API request and response type definitions

// 판매자 상품 API
// 판매자 상품 관련 API endpoints
export interface GetProductSellerRequestType {
	// path
	productUuid: string
}
export interface GetProductSellerResponseType {
	sellerUuid: string
}

export interface PromptContentType {
	contentUrl: string
	contentOrder: number
	sampleValue: string
}

export interface GetSellerProductListRequestType {
	sellerUuid: string // 판매자 UUID (path)
	searchBar?: string // 검색어 (query)
	sortOption?: "price" | "sells" | "createdAt" // 정렬 기준 price, sells, createdAt(default) (query)
	sortBy?: "ASC" | "DESC" // 정렬 방향 ASC, DESC(default) (query)
	enable?: boolean // 상품 판매 여부 true(default), false (query)
	temporary?: boolean // 임시 등록 여부 true(default), false (query)
	cursorId?: string // 페이징 커서 (query)
	pageSize?: number // 페이지 사이즈 (query) default: 16
}
export interface GetSellerProductListResponseType {
	productList: GetSellerProductResultType[]
	nextCursorId: string
	hasNext: boolean
}
export interface GetSellerProductResultType {
	productName: string
	productUuid: string
	price: number
	sells: number
	enable: boolean
	temporary: boolean
}

// 상품 조회
export interface GetProductDetailRequestType {
	// path
	productUuid: string
}

export interface GetProductDetailResponseType {
	productUuid: string
	sellerUuid: string
	productName: string
	price: number
	prompt: string
	description: string
	llmId: number
	topCategoryUuid: string
	subCategoryUuid: string
	contents: PromptContentType[]
	discountRate: number
	enabled: boolean
	approved: boolean
	seed: string
	llmVersionId: number
	avgStar: number
	sells: number
	reviewCount: number
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}

// 상품 수정 - reqbody
export interface ModifyProductRequestType {
	productUuid?: string
	productName?: string
	price?: number
	prompt?: string
	description?: string
	llmId?: number
	topCategoryUuid?: string
	subCategoryUuid?: string
	contents?: PromptContentType[]
	discountRate?: number
	enabled?: boolean
	approved?: boolean
	seed?: string
	llmVersionId?: number
}

// 상품 등록
// llmId: (Dall-E, 1), (GPT, 2)
// contents는 리스트 형태로 여러 개 등록 가능.
// reqbody
export interface CreateProductRequestType {
	sellerUuid: string
	productName: string
	price: number
	prompt: string
	description: string
	llmId: number
	topCategoryUuid: string
	subCategoryUuid: string
	contents: PromptContentType[]
	discountRate: number
	seed: string
	llmVersionId: number
}

export interface RemoveProductRequestType {
	productUuid: string
}

// 상품 임시 등록
//
// llmId: (Dall-E, 1), (GPT, 2)
// contents는 리스트 형태로 여러 개 등록 가능.
export interface CreateProductTempRequestType {
	sellerUuid?: string
	productName?: string
	price?: number
	prompt?: string
	description?: string
	llmId?: number
	topCategoryUuid?: string
	subCategoryUuid?: string
	contents?: PromptContentType[]
	discountRate?: number
	seed?: string
	llmVersionId?: number
}
export interface CreateProductTempResponseType {
	productUuid: string
}
