import { useState } from "react"
import { fetchSearchResults } from "@/action/search/searchAction"
import type {
	SearchResultCreatorType,
	SearchResultPromptType,
} from "@/types/search/searchResultType"

interface UseSearchActions {
	creators: SearchResultCreatorType[]
	prompts: SearchResultPromptType[]
	fetchAndSetSearchResults: (query: string) => Promise<void>
}

export function useSearchActions(): UseSearchActions {
	const [creators, setCreators] = useState<SearchResultCreatorType[]>([])
	const [prompts, setPrompts] = useState<SearchResultPromptType[]>([])

	async function fetchAndSetSearchResults(query: string) {
		const data = await fetchSearchResults(query)
		setCreators(data.creators)
		setPrompts(data.prompts)
	}

	return {
		creators,
		prompts,
		fetchAndSetSearchResults,
	}
}
