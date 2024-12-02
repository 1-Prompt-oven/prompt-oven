export interface PromptTopType {
	productUuid: string
	thumbnailUrl: string
	productName: string
	llmId: number
	avgStar: number
	price: number
	createdAt?: string
}

export interface PromptsType {
	productUuid: string
	sellerUuid: string
	productName: string
	price: number
	prompt: string
	llmId: number
	description: string
	topCategoryUuid: string
	subCategoryUuid: string
	contents: {
		contentUrl: string
		contentOrder: number
		sampleValue: string
	}[]
	avgStar: number
	createdAt: string
}
