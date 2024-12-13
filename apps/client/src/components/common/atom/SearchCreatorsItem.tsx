import React from "react"
import Image from "next/image"
import { Star } from "@repo/ui/lucide"
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
				src={creator.thumbnail || ""}
				alt="creator's thumbnail"
				className="pointer-events-none rounded border border-[#424242] object-cover"
				width={64}
				height={64}
			/>
			<div className="text-muted-foreground flex min-w-0 flex-col items-start justify-between truncate">
				<div className="text-muted-foreground truncate text-left font-medium">
					{creator.nickname}
				</div>
				<div className="text-muted-foreground text-sm font-semibold">
					# {creator.rank}
				</div>
				<div className="text-muted-foreground pointer-events-none flex items-center gap-2 text-sm">
					<span className="pointer-events-none flex items-center">
						<Star className="text-muted-foreground mr-1 h-3 w-3 fill-current" />
						{creator.rating}
					</span>
					<span className="text-muted-foreground ml-auto font-medium">
						{creator.follower} followers
					</span>
				</div>
			</div>
		</button>
	)
}

export default SearchCreatorsItem
