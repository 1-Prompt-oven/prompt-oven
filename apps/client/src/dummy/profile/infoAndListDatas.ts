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
		productUuid: "pr-od-uc-t1",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard1.png",
		productName: "Product1",
		llmId: 1,
		avgStar: 4.7,
		price: 14000,
		createdAt: "2024-11-08",
	},
	{
		productUuid: "pr-od-uc-t2",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard2.png",
		productName: "Product2",
		llmId: 2,
		avgStar: 2.7,
		price: 5000,
		createdAt: "2024-11-04",
	},
	{
		productUuid: "pr-od-uc-t3",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard3.png",
		productName: "Product3",
		llmId: 3,
		avgStar: 5,
		price: 300,
		createdAt: "2024-11-02",
	},
	{
		productUuid: "pr-od-uc-t4",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard4.png",
		productName: "Product4",
		llmId: 4,
		avgStar: 3.2,
		price: 200,
		createdAt: "2024-11-01",
	},
	{
		productUuid: "pr-od-uc-t5",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard5.png",
		productName: "Product5",
		llmId: 5,
		avgStar: 5,
		price: 2500,
		createdAt: "2024-11-01",
	},
	{
		productUuid: "pr-od-uc-t6",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard6.png",
		productName: "Product6",
		llmId: 6,
		avgStar: 2.2,
		price: 1100,
		createdAt: "2024-10-31",
	},
	{
		productUuid: "pr-od-uc-t7",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard7.png",
		productName: "Product7",
		llmId: 7,
		avgStar: 4.5,
		price: 3000,
		createdAt: "2024-10-31",
	},
	{
		productUuid: "pr-od-uc-t8",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard8.png",
		productName: "Product8",
		llmId: 8,
		avgStar: 4.2,
		price: 700,
		createdAt: "2024-10-28",
	},
	{
		productUuid: "pr-od-uc-t9",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard9.png",
		productName: "Product9",
		llmId: 9,
		avgStar: 4.2,
		price: 300,
		createdAt: "2024-10-27",
	},
	{
		productUuid: "pr-od-uc-t10",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard10.png",
		productName: "Product10",
		llmId: 10,
		avgStar: 4.2,
		price: 400,
		createdAt: "2024-10-23",
	},
	{
		productUuid: "pr-od-uc-t11",
		thumbnailUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/ProfileCard11.png",
		productName: "Product11",
		llmId: 11,
		avgStar: 4.2,
		price: 1200,
		createdAt: "2024-10-16",
	},
]

