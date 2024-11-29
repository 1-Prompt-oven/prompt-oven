import type { CartItemType } from "@/types/cart/cartTypes"

export const dummyCartItems: CartItemType[] = [
	{
		id: 1,
		productUuid: "item1",
		memberUuid: "member1",
		selected: false,
		productName: "Christmas Card",
		thumbnailUrl:
			"https://assets.promptbase.com/DALLE_IMAGES%2FrZHZRYckkfU3lYMhm1wJrrvtyLD2%2Fresized%2F1686953714424_150x150.webp?alt=media&token=4f49bbb1-bf1b-4681-b261-03fed292f9ef",
		price: 4000,
		llmName: "Dall-E",
	},
	{
		id: 2,
		productUuid: "item2",
		memberUuid: "member1",
		selected: true,
		productName: "Jeju Puppy Bandal",
		thumbnailUrl: "/img/cart/jejuBandal.jpg",
		price: 20000000,
		llmName: "GPT",
	},
	{
		id: 3,
		productUuid: "item3",
		memberUuid: "member1",
		selected: false,
		productName: "Pastel Illustration",
		thumbnailUrl:
			"https://assets.promptbase.com/DALLE_IMAGES%2FVAXItKojEQXmXUs4prJNIftWE6T2%2Fresized%2F1728324786805_100x100.webp?alt=media&token=8ca1932d-3be9-4f2b-88da-54e9df2649fe",
		price: 1500,
		llmName: "Dall-E",
	},
	{
		id: 4,
		productUuid: "item4",
		memberUuid: "member1",
		selected: true,
		productName: "Smiling Bandal",
		thumbnailUrl: "/img/cart/smileBandal.jpg",
		price: 10000000,
		llmName: "GPT",
	},
]
