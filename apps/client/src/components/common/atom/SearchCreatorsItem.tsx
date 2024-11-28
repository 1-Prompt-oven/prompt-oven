import React from "react"
import Image from "next/image"
import type { SearchResultCreatorType } from "@/types/search/searchResultType"

function SearchCreatorsItem({
	creator,
	onClick,
}: {
	creator: SearchResultCreatorType
	onClick: () => void
}) {
	return (
		<button
			type="button"
			className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-white"
			onClick={onClick}>
			<Image
				src={creator.thumbnail || "/placeholder.svg"}
				alt="creator's thumbnail"
				className="pointer-events-none rounded border border-[#424242] object-cover"
				width={64}
				height={64}
			/>
			<div className="text-muted-foreground flex min-w-0 flex-col items-start justify-between truncate">
				<div className="text-muted-foreground truncate text-left font-medium">
					{creator.nickname}
				</div>
			</div>
		</button>
	)
}

export default SearchCreatorsItem
