"use server"

import type { SearchResultCreatorType } from "@/types/search/searchResultType"
import type {
	CommonResType,
	PromptApiResponseType,
} from "@/types/common/responseType"
import type { PromptDetailType } from "@/types/search/searchResultType"

export interface FetchResults {
	prompts: PromptDetailType[]
	creators: SearchResultCreatorType[]
}

export async function fetchSearchResults(
	query: string,
	tab: string,
): Promise<FetchResults> {
	"use server"
	// 상품 검색 결과 fetch
	if (tab === "prompt") {
		const promptResponse = await fetch(
			`${process.env.API_BASE_URL}/v1/product/list?searchBar=${query}&pageSize=5`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				method: "GET",
				cache: "no-cache",
			},
		)
		const promptData: CommonResType<PromptApiResponseType> =
			await promptResponse.json()
		const prompts = promptData.result.productList
		return { prompts, creators: [] }
	}
	// 크리에이터 검색 결과 fetch
	const creatorResponse = await fetch(
		`${process.env.API_BASE_URL}/v1/profile/search?query=${query}`,
		{
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			method: "GET",
			cache: "no-cache",
		},
	)
	const creatorData: CommonResType<SearchResultCreatorType[]> =
		await creatorResponse.json()
	const creators = creatorData.result.slice(0, 5)
	return { creators, prompts: [] }
}

