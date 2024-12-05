export interface SearchResultPromptType {
	productUuid: string
	productName: string
	model: string
	title: string
	avgStar: number
	price: number
	thumbnailUrl: string
}

export interface SearchResultCreatorType {
	backgroundImg: string
	thumbnail: string
	nickname: string
	rank: number
	rating: number
	follower: number
	id: string
}

export interface PromptDetailType {
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

