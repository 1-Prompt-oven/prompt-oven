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
