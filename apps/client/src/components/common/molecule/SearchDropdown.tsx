"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Search } from "@repo/ui/lucide"
import type {
	SearchResultCreatorType,
	SearchResultPromptType,
} from "@/types/search/searchResultType"
import SearchCreatorsItem from "../atom/SearchCreatorsItem"
import SearchPromptsItem from "../atom/SearchPromptsItem"
import SearchPromptsItemSkeleton from "../atom/SearchItemSkeleton"

interface SearchDropdownProps {
	creators: SearchResultCreatorType[]
	prompts: SearchResultPromptType[]
	query?: string
	isLoading?: boolean
}

function SearchDropdown({
	creators,
	prompts,
	query,
	isLoading,
}: SearchDropdownProps) {
	const router = useRouter()
	if (isLoading) {
		return (
			<div className="absolute left-0 top-full z-10 w-full rounded-lg bg-neutral-600 py-4 pl-2">
				<SearchPromptsItemSkeleton />
			</div>
		)
	}
	return (
		<div className="bg-neutral-400">
			<div>
				<div className="text-m p-2 pt-3 text-white">Prompts</div>
				{prompts.length > 0 &&
					prompts.map((prompt) => (
						<SearchPromptsItem
							key={prompt.id}
							prompt={prompt}
							onClick={() => router.push(`/prompt-detail/${prompt.id}`)}
						/>
					))}
			</div>
			<hr className="mt-3" />
			<div>
				<div className="text-m p-2 pt-3 text-white">Creators</div>
				{creators.length > 0 &&
					creators.map((creator) => (
						<SearchCreatorsItem
							key={creator.id}
							creator={creator}
							onClick={() => router.push(`/profile/${creator.id}`)}
						/>
					))}
			</div>
			<hr className="mt-3" />
			<div className="w-full py-3 hover:bg-white">
				<button
					type="button"
					className="text-muted-foreground flex w-full items-center px-4 py-3 text-sm transition-colors"
					onClick={() => router.push(`/prompts/${query}`)}>
					<Search className="h-8 w-8 shrink-0" />
					<span className="ml-2">Explore all {query} prompts</span>
				</button>
			</div>
		</div>
	)
}

export default SearchDropdown
