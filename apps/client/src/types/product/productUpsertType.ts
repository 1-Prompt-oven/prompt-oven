// -- Components type definitions
export interface TextPromptSampleContentType {
	id: string
	name: string
	value: Record<string, string>
	result: string
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

// // llm
export interface GetLlmRequestType {
	llmId: number
}
export interface GetLlmResponseType {
	llmName: string
}

// // Product
export interface GetProductSellerRequestType {
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

export interface ProductUpsertType {
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
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}

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

export interface ModifyProductRequestType {
	productUuid: string
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
}

export interface RemoveProductRequestType {
	productUuid: string
}
