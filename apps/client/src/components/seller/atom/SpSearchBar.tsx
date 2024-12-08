"use client"

import React, { useState } from "react"
import { Search } from "@repo/ui/lucide"
import { Input } from "@repo/ui/input"
// eslint-disable-next-line import/named -- lodash는 named export입니다.
import { debounce } from "lodash"

interface SpSearchBarProps {
	onSearch: (searchTerm: string) => void
}

function SpSearchBar({ onSearch }: SpSearchBarProps) {
	const [searchTerm, setSearchTerm] = useState("")

	const debouncedOnSearch = debounce(onSearch, 400)
	const searchBarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		debouncedOnSearch(e.target.value)
	}

	return (
		<div className="relative w-full">
			<Search className="absolute !left-2 !top-1/2 !h-6 !w-6 -translate-y-1/2 text-[#E2ADFF]" />
			<Input
				className="!h-11 w-full rounded-md border-0 border-b border-[#E2ADFF]/25 bg-black !pl-10 text-[#475569] focus-visible:ring-0"
				placeholder="Search by email or name"
				value={searchTerm}
				onChange={(e) => {
					searchBarHandler(e)
				}}
			/>
		</div>
	)
}

export default SpSearchBar
