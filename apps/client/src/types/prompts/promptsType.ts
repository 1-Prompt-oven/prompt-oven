export interface PromptsType {
	productList: PromptItemType[]
	nextCursorId: string
	hasNext: boolean
}

export interface PromptItemType {
	productUuid: string
	productName: string
	price: number
	topCategoryUuid: string
	subCategoryUuid: string
	enabled: boolean // boolean으로 변경
	avgStar: number
	sells: number
	likeCount: number
	llmId: number
	description: string
	discountRate: number
	reviewCount: number
	createdAt: string
	thumbnailUrl: string
}
