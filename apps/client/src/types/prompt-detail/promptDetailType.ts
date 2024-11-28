export interface PromptDetailInfoType {
	productUuid: string
	thumbnailUrl: string
	productName: string
	avgStar: number
	productReviewCount: number
	createdAt: string
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
