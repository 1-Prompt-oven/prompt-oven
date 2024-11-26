import React from "react"
import { Skeleton } from "@repo/ui/skeleton"

function SearchItemSkeleton() {
	return (
		<div className="space-y-4">
			{[1, 2, 3].map((i) => (
				<div className="flex items-center gap-3 p-2" key={`prompt-${i}`}>
					<Skeleton className="h-16 w-16 rounded" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-[60%] rounded-none" />
						<div className="flex items-center gap-2">
							<Skeleton className="h-3 w-[20%] rounded-none" />
							<Skeleton className="h-3 w-[10%] rounded-none" />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default SearchItemSkeleton
