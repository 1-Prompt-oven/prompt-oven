export interface PromptDetailInfoType {
	productUuid: string
	thumbnailUrl: string
	productName: string
	productStar: number
	productReviewCount: number
	productRegistDate: string
	price: number
	productDescription: string
	hashTag: string
	bio: string | undefined
	memberProfileImage: string | undefined
	memberNickname: string | undefined
	isBuy: boolean
	isCart: boolean
	isFavorite: boolean
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
