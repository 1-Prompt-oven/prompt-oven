export interface FollowingType {
	memberUuid: string
	memberProfileImage: string
	memberNickname: string
}

export interface Follower extends FollowingType {
	isFollowing: boolean
}
