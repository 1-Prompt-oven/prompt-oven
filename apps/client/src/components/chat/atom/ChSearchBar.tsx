import { Search } from "@repo/ui/lucide"
import { Input } from "@repo/ui/input"
import React, { useState } from "react"
// eslint-disable-next-line import/named -- ok
import { debounce } from "lodash"
import { cn } from "@/lib/utils.ts"

interface ChSearchBarProps {
	onSearch: (searchTerm: string) => void
	className?: string
}

function ChSearchBar({ onSearch, className }: ChSearchBarProps) {
	const [searchTerm, setSearchTerm] = useState("")

	const debouncedOnSearch = debounce(onSearch, 400)
	const searchBarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		debouncedOnSearch(e.target.value)
	}

	return (
		<div className="relative w-full">
			<Search className="absolute !left-3 !top-1/2 !h-5 !w-5 -translate-y-1/2 text-[#E2ADFF]" />
			<Input
				type="text"
				className={cn(
					"!h-10 w-full rounded-full bg-[#404040] px-4 py-2 !pl-10 text-[#E2ADFF] placeholder-[#B1B1B1] focus:outline-none focus:ring-2 focus:ring-[#A913F9]",
					className,
				)}
				placeholder="Search By Room Name"
				value={searchTerm}
				onChange={(e) => {
					searchBarHandler(e)
				}}
			/>
		</div>
	)
}

export default ChSearchBar
