import { Search } from "@repo/ui/lucide"
import { Input } from "@repo/ui/input"
import type { HTMLProps } from "react"

type ChSearchBarProps = HTMLProps<HTMLInputElement>

function ChSearchBar({ ...props }: ChSearchBarProps) {
	return (
		<div className="relative w-full">
			<Search className="absolute !left-3 !top-1/2 !h-5 !w-5 -translate-y-1/2 text-[#E2ADFF]" />
			<Input
				className="!h-10 w-full rounded-full bg-[#404040] px-4 py-2 !pl-10 text-[#E2ADFF] placeholder-[#B1B1B1] focus:outline-none focus:ring-2 focus:ring-[#A913F9]"
				placeholder="Search By Room Name"
				{...props}
			/>
		</div>
	)
}

export default ChSearchBar
