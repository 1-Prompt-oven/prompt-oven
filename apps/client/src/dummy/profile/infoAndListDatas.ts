import type { ProfileInfoType } from "@/types/profile/profileTypes"

export const profileDatas: ProfileInfoType = {
	memberInfo: {
		memberUUID: "tester",
		// bannerImageUrl: "/img/banner.png",
		// avatarImageUrl: "/img/avatar.png",
		// bannerImageUrl: "https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/banner.png",
		avatarImageUrl:
			"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/avatar.png",
		nickname: "chocochip",
		instagramName: "chocochipGram",
		youtubeUrl: "chocoYtu.com",
		websiteUrl: "chocoWeb.com",
		allowMessage: false,
		acceptCustom: true,
	},
	favoriteList: [
		{
			productUUID: "1",
			// thumbnailUrl: "/img/product1.png",
			thumbnailUrl:
				"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/product1.png",
			categoryName: "category!!",
			productName: "product!!",
			productPrice: "1000",
		},
		{
			productUUID: "2",
			// thumbnailUrl: "/img/banner.png",
			thumbnailUrl:
				"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/banner.png",
			categoryName: "category!!",
			productName: "product!!",
			productPrice: "2000",
		},
		{
			productUUID: "3",
			// thumbnailUrl: "/img/product2.png",
			thumbnailUrl:
				"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/product2.png",
			categoryName: "category!!",
			productName: "product!!",
			productPrice: "3000",
		},
		{
			productUUID: "4",
			// thumbnailUrl: "/img/avatar.png",
			thumbnailUrl:
				"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/avatar.png",
			categoryName: "category!!",
			productName: "product!!",
			productPrice: "4000",
		},
		{
			productUUID: "5",
			// thumbnailUrl: "/img/product3.png",
			thumbnailUrl:
				"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/product3.png",
			categoryName: "category!!",
			productName: "product!!",
			productPrice: "5000",
		},
		{
			productUUID: "6",
			// thumbnailUrl: "/img/product4.png",
			thumbnailUrl:
				"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/product4.png",
			categoryName: "category!!",
			productName: "product!!",
			productPrice: "6000",
		},
	],
	registList: [
		{
			productUUID: "1",
			// thumbnailUrl: "/img/product5.png",
			thumbnailUrl:
				"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/product5.png",
			categoryName: "category!!",
			productName: "product!!",
			productPrice: "1000",
		},
	],
}
