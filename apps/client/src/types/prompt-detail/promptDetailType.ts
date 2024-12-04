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
