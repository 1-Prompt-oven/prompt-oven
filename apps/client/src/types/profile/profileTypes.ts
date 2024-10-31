// No cache Data - Because it is data that needs to be reflected in real time.
export interface ReviewAndFollowType {
	memberUUID: string
	reviews: number
	following: number
	followers: number
}

// Cache Data
export interface ProfileInfoType {
	memberInfo: MemberInfoType
	favoriteList: ProfileListType[]
	registList: ProfileListType[]
}

export interface MemberInfoType {
	memberUUID: string
	bannerImageUrl?: string | undefined
	avatarImageUrl?: string | undefined
	nickname: string
	twitterName?: string | undefined
	instagramName?: string | undefined
	youtubeUrl?: string | undefined
	websiteUrl?: string | undefined
	allowMessage: boolean
	acceptCustom: boolean
}

export interface ProfileListType {
	productUUID: string
	thumbnailUrl: string
	categoryName: string
	productName: string
	productPrice: string
}
