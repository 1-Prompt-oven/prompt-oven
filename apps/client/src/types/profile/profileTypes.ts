export interface ProfileMemberInfoType {
	memberUUID: string
	bannerImageUrl?: string | undefined
	avatarImageUrl?: string | undefined
	hashTag?: string | undefined
	bio?: string | undefined
	email?: string | undefined
	nickname: string
	joined: string
	following: number
	follower: number
	viewer: number
	sales: number
}
