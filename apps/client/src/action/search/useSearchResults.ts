import { useState } from "react"
import { fetchSearchResults } from "@/action/search/searchAction"
import type { FetchResults } from "@/action/search/searchAction"
import type { SearchResultCreatorType } from "@/types/search/searchResultType"
import type { PromptsType } from "@/types/prompts/promptsType"

interface UseSearchActions extends FetchResults {
	fetchAndSetSearchResults: (query: string, tab: string) => Promise<void>
}

export function useSearchActions(): UseSearchActions {
	const [creators, setCreators] = useState<SearchResultCreatorType[]>([])
	const [prompts, setPrompts] = useState<PromptsType[]>([])

	async function fetchAndSetSearchResults(query: string, tab: string) {
		const data = await fetchSearchResults(query, tab)

		if (tab === "prompt") {
			setPrompts(data.prompts)
		} else if (tab === "creator") {
			setCreators(data.creators)
		}
	}

	return {
		creators,
		prompts,
		fetchAndSetSearchResults,
	}
}

