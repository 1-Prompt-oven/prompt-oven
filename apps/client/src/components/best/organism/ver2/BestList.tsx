import React from "react"
import type { RenderedRankingItemTypes } from "@/types/best/bestTypes"
import { BestCreatorListItem } from "@/components/best/molecule/ver2/BestCreatorListItem"

interface BestListProps<T> {
	data: T[]
}

function BestList({ data }: BestListProps<RenderedRankingItemTypes>) {
	return (
		<div className="mx-auto w-full max-w-[1716px]">
			<div>
				<div className="grid grid-cols-12 gap-5 px-6 py-4 text-lg font-semibold text-white">
					<div className="col-span-2">Rank</div>
					<div className="col-span-3">Creator&apos;s Name</div>
					<div className="col-span-2">Creator&apos;s Tag</div>
					<div className="col-span-1">Daily Sales</div>
					<div className="col-span-1">Avg Star</div>
					<div className="col-span-2">Followers</div>
					<div className="flex items-center">
						<span>Total Sales</span>
					</div>
				</div>
				<div className="h-1 w-full bg-rose-200" />
			</div>
			{data.map((creator) => (
				<BestCreatorListItem key={creator.memberUUID} {...creator} />
			))}
		</div>
	)
}

export default BestList
