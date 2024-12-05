// import { useState } from "react"
// import { fetchSearchResults } from "@/action/search/searchAction"
// import type { FetchResults } from "@/action/search/searchAction"
// import type { SearchResultCreatorType } from "@/types/search/searchResultType"
// import type { PromptDetailType } from "@/types/search/searchResultType"

// interface UseSearchActions extends FetchResults {
// 	fetchAndSetSearchResults: (query: string, tab: string) => Promise<void>
// 	setCreators: React.Dispatch<React.SetStateAction<SearchResultCreatorType[]>>
// 	setPrompts: React.Dispatch<React.SetStateAction<PromptDetailType[]>>
// }

// export function useSearchActions(): UseSearchActions {
// 	const [creators, setCreators] = useState<SearchResultCreatorType[]>([])
// 	const [prompts, setPrompts] = useState<PromptDetailType[]>([])

// 	async function fetchAndSetSearchResults(query: string, tab: string) {
// 		if (query === "") {
// 			setPrompts([])
// 			setCreators([])
// 			return
// 		}

// 		const data: { prompts?: PromptDetailType[], creators?: SearchResultCreatorType[] } = await fetchSearchResults(query, tab)

// 		if (tab === "prompt") {
// 			setPrompts(data.prompts || [])
// 		} else if (tab === "creator") {
// 			setCreators(data.creators)
// 		}
// 	}

// 	return {
// 		creators,
// 		prompts,
// 		setCreators,
// 		setPrompts,
// 		fetchAndSetSearchResults,
// 	}
// }
