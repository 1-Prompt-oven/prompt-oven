export interface PromptDetailInfoType {
	productUuid: string
	sellerUuid: string
	productName: string
	price: number
	prompt: string
	description: string
	llmId: number
	topCategoryUuid: string
	subCategoryUuid: string
	contents: PromptDetailContentsType[]
	discountRate: number
	enabled: boolean
	approved: boolean
	seed: string
	llmVersionId: number
	avgStar: number
	sells: number
	reviewCount: number
	createdAt: string
	updatedAt: string
}

export interface PromptDetailContentsType {
	contentUrl: string
	contentOrder: number
	sampleValue: string
}

export interface ProfileDetailSellorShortType {
	memberUuid: string
	memberProfileImage: string
	memberNickname: string
}

export interface PromptDetailFavoriteStateType {
	liked: boolean
}

export interface PromptDetailCartStateType {
	result: boolean
}

export interface PromptDetailCartAllNumberType {
	id: number
	memberUuid: string
	productUuid: string
	selected: boolean
	deleted: boolean
	createdDate: string
	lastModifiedDate: string
}
