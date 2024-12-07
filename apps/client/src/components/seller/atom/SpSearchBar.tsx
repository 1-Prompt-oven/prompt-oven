"use client"

import React, { useEffect, useState } from "react"
import { Search } from "@repo/ui/lucide"
import { Input } from "@repo/ui/input"

interface SpSearchBarProps {
	onSearch: (searchTerm: string) => void
}

function SpSearchBar({ onSearch }: SpSearchBarProps) {
	const [searchTerm, setSearchTerm] = useState("")

	useEffect(() => {
		const timer = setTimeout(() => {
			onSearch(searchTerm)
		}, 300)

		return () => clearTimeout(timer)
	}, [searchTerm, onSearch])

	return (
		<div className="relative w-full">
			<Search className="absolute !left-2 !top-1/2 !h-6 !w-6 -translate-y-1/2 text-[#E2ADFF]" />
			<Input
				className="!h-11 w-full rounded-md border-0 border-b border-[#E2ADFF]/25 bg-black !pl-10 text-[#475569] focus-visible:ring-0"
				placeholder="Search by email or name"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	)
}

export default SpSearchBar
