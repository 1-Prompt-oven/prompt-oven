import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import type { PromptsType } from "@/types/prompts/promptsType"

//프로필 멤버 정보 - undefined 정보 포함
export const profileMemberInfoUndefineData: ProfileMemberInfoType = {
	memberUUID: "1a-1a-1a",
	nickname: "촉촉한사람",
	joined: "2024-11-04",
	following: 12423,
	follower: 2365121,
	viewer: 413487,
	sales: 412,
}

//프로필 멤버 정보 - undefined 정보 미포함
export const profileMemberInfoData: ProfileMemberInfoType = {
	memberUUID: "me-mb-er",
	bannerImageUrl:
		"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileBanner.png",
	avatarImageUrl:
		"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/TestAvartar.png",
	hashTag: "이히히 해시태그",
	bio: "촉촉한 초코칩 구한 포파포프씨는 스미스무스므를 떠난다. 포파포프씨는 딸인 파푸포푸에게 촉촉한 초코칩을 줄 것이다.",
	email: "chockchock@gmail.com",
	nickname: "촉촉한사람",
	joined: "2024-11-04",
	following: 12423,
	follower: 2365121,
	viewer: 413487,
	sales: 4121,
}

export const profileListData: PromptsType[] = [
	{
		productUUID: "pr-od-uc-t1",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard1.png",
		productName: "Product1",
		llmId: 1,
		productStar: 4.7,
		productPrice: 14000,
		productRegistDate: "2024-11-08",
	},
	{
		productUUID: "pr-od-uc-t2",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard2.png",
		productName: "Product2",
		llmId: 2,
		productStar: 2.7,
		productPrice: 5000,
		productRegistDate: "2024-11-04",
	},
	{
		productUUID: "pr-od-uc-t3",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard3.png",
		productName: "Product3",
		llmId: 3,
		productStar: 5,
		productPrice: 300,
		productRegistDate: "2024-11-02",
	},
	{
		productUUID: "pr-od-uc-t4",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard4.png",
		productName: "Product4",
		llmId: 4,
		productStar: 3.2,
		productPrice: 200,
		productRegistDate: "2024-11-01",
	},
	{
		productUUID: "pr-od-uc-t5",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard5.png",
		productName: "Product5",
		llmId: 5,
		productStar: 5,
		productPrice: 2500,
		productRegistDate: "2024-11-01",
	},
	{
		productUUID: "pr-od-uc-t6",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard6.png",
		productName: "Product6",
		llmId: 6,
		productStar: 2.2,
		productPrice: 1100,
		productRegistDate: "2024-10-31",
	},
	{
		productUUID: "pr-od-uc-t7",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard7.png",
		productName: "Product7",
		llmId: 7,
		productStar: 4.5,
		productPrice: 3000,
		productRegistDate: "2024-10-31",
	},
	{
		productUUID: "pr-od-uc-t8",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard8.png",
		productName: "Product8",
		llmId: 8,
		productStar: 4.2,
		productPrice: 700,
		productRegistDate: "2024-10-28",
	},
	{
		productUUID: "pr-od-uc-t9",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard9.png",
		productName: "Product9",
		llmId: 9,
		productStar: 4.2,
		productPrice: 300,
		productRegistDate: "2024-10-27",
	},
	{
		productUUID: "pr-od-uc-t10",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard10.png",
		productName: "Product10",
		llmId: 10,
		productStar: 4.2,
		productPrice: 400,
		productRegistDate: "2024-10-23",
	},
	{
		productUUID: "pr-od-uc-t11",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard11.png",
		productName: "Product11",
		llmId: 11,
		productStar: 4.2,
		productPrice: 1200,
		productRegistDate: "2024-10-16",
	},
]
