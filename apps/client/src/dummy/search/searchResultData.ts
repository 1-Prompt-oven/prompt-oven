import type { PromptsType } from "@/types/prompts/promptsType"
import type { SearchResultCreatorType } from "../../types/search/searchResultType"

// 검색 결과 - 크리에이터

export const searchResultCreatorData: SearchResultCreatorType[] = [
	{
		id: "c1",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
		nickname: "clipcraft",
	},
	{
		id: "c2",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
		nickname: "hawkeyepro",
	},
	{
		id: "c3",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
		nickname: "promptlydesigned",
	},
	{
		id: "c4",
		thumbnail:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
		nickname: "akynapriest",
	},
]

// 검색 결과 - 프롬프트

export const searchResultPromptData: PromptsType[] = [
	{
		productUuid: "p1",
		llmId: 2,
		productName: "Party Organizator",
		avgStar: 4.8,
		price: 1000,
		thumbnailUrl:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
	},
	{
		productUuid: "p2",
		llmId: 1,
		productName: "Cute Halloween Party Invitations",
		avgStar: 4.6,
		price: 3500,
		thumbnailUrl:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
	},
	{
		productUuid: "p3",
		llmId: 1,
		productName: "Golden Christmas Party Card Design",
		avgStar: 4.7,
		price: 2500,
		thumbnailUrl:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
	},
	{
		productUuid: "p4",
		llmId: 2,
		productName: "Event Planning And Party Ideas",
		avgStar: 4.9,
		price: 4000,
		thumbnailUrl:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
	},
]
