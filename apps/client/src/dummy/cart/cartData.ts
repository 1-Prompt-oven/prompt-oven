import type { CartItemType } from "@/types/cart/cartTypes"

export const dummyCartItems: CartItemType[] = [
	{
		itemId: "item1",
		memberUuid: "member1",
		selected: false,
		productName: "Christmas Card",
		productImage:
			"https://assets.promptbase.com/DALLE_IMAGES%2FrZHZRYckkfU3lYMhm1wJrrvtyLD2%2Fresized%2F1686953714424_150x150.webp?alt=media&token=4f49bbb1-bf1b-4681-b261-03fed292f9ef",
		productPrice: 4000,
	},
	{
		itemId: "item2",
		memberUuid: "member1",
		selected: true,
		productName: "Jeju Puppy Bandal",
		productImage: "/img/cart/jejuBandal.jpg",
		productPrice: 20000000,
	},
	{
		itemId: "item3",
		memberUuid: "member1",
		selected: false,
		productName: "Pastel Illustration",
		productImage:
			"https://assets.promptbase.com/DALLE_IMAGES%2FVAXItKojEQXmXUs4prJNIftWE6T2%2Fresized%2F1728324786805_100x100.webp?alt=media&token=8ca1932d-3be9-4f2b-88da-54e9df2649fe",
		productPrice: 1500,
	},
	{
		itemId: "item4",
		memberUuid: "member1",
		selected: true,
		productName: "Smiling Bandal",
		productImage: "/img/cart/smileBandal.jpg",
		productPrice: 10000000,
	},
]
