"use client"

import React, { useState, useEffect } from "react"
import debounce from "lodash/debounce"
import { useRouter } from "next/navigation"
import { useSearchActions } from "@/action/search/useSearchResults"
import SearchInput from "../atom/SearchInputWrapper"
import SearchDropdown from "../molecule/SearchDropdown"

function SearchOrganism() {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const { creators, prompts, fetchAndSetSearchResults } = useSearchActions()
	const router = useRouter()

	const debouncedFetchAndSetSearchResults = debounce((searchQuery: string) => {
		setIsLoading(true)
		fetchAndSetSearchResults(searchQuery)
		setIsLoading(false)
	}, 300)

	useEffect(() => {
		if (query) {
			setOpen(true)
			debouncedFetchAndSetSearchResults(query)
		} else {
			setOpen(false)
		}
	}, [query])

	const handleFocus = () => setOpen(true)
	const handleBlur = () => setTimeout(() => setOpen(false), 100)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (query === "") {
			return
		}
		router.push(`/prompts?query=${query}`)
		setQuery("")
	}
	return (
		<form className="relative w-full" onSubmit={handleSubmit}>
			<SearchInput
				value={query}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={(e) => setQuery(e.target.value)}
			/>
			{open && query.length > 0 && (
				<div className="absolute left-0 top-full z-10 w-full">
					<SearchDropdown
						creators={creators}
						prompts={prompts}
						query={query}
						isLoading={isLoading}
					/>
				</div>
			)}
		</form>
	)
}

export default SearchOrganism
