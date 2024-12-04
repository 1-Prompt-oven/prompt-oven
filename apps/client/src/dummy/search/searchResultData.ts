import type {
	SearchResultCreatorType,
	SearchResultPromptType,
} from "../../types/search/searchResultType"

// 검색 결과 - 크리에이터

export const searchResultCreatorData: SearchResultCreatorType[] = [
	{
		id: "c1",
		backgroundImg: "https://example.com/images/background1.jpg",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
		nickname: "clipcraft",
		rank: 32,
		rating: 4.7,
		follower: 1020,
	},
	{
		id: "c2",
		backgroundImg: "https://example.com/images/background2.jpg",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
		nickname: "hawkeyepro",
		rank: 73,
		rating: 4.7,
		follower: 1785,
	},
	{
		id: "c3",
		backgroundImg: "https://example.com/images/background3.jpg",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
		nickname: "promptlydesigned",
		rank: 150,
		rating: 4.5,
		follower: 390,
	},
	{
		id: "c4",
		backgroundImg: "https://example.com/images/background4.jpg",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
		nickname: "akynapriest",
		rank: 6,
		rating: 4.9,
		follower: 7034,
	},
]

// 검색 결과 - 프롬프트

export const searchResultPromptData: SearchResultPromptType[] = [
	{
		id: "p1",
		model: "GPT-4",
		title: "Party Organizator",
		rating: 4.8,
		price: "15",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
	},
	{
		id: "p2",
		model: "Midjourney",
		title: "Cute Halloween Party Invitations",
		rating: 4.6,
		price: "12",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
	},
	{
		id: "p3",
		model: "DALLE-2",
		title: "Golden Christmas Party Card Design",
		rating: 4.7,
		price: "25",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
	},
	{
		id: "p4",
		model: "GPT-4",
		title: "Event Planning And Party Ideas",
		rating: 4.9,
		price: "18",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
	},
]
