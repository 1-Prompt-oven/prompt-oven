import type {
	SearchResultCreatorType,
	SearchResultPromptType,
} from "@/types/search/searchResultType"
import {
	searchResultCreatorData,
	searchResultPromptData,
} from "@/dummy/search/searchResultData"

interface FetchSearchResults {
	creators: SearchResultCreatorType[]
	prompts: SearchResultPromptType[]
}

export async function fetchSearchResults(
	query: string,
): Promise<FetchSearchResults> {
	// query: string,
	// // 상품 검색 결과 fetch
	// const productResponse = await fetch(`/v1/search/product?q=${query}`);
	// const productData = await productResponse.json();

	// // 크리에이터 검색 결과 fetch
	// const creatorResponse = await fetch(`/v1/search/creator?q=${query}`);
	// const creatorData = await creatorResponse.json();

	// return {
	//   creators: creatorData,
	//   products: productData,
	// };

	const _query = query
	return {
		creators: searchResultCreatorData,
		prompts: searchResultPromptData,
	}
}
