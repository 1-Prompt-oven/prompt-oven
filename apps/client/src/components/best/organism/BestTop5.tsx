import React from "react"
import type { RenderedRankingItemTypes } from "@/types/best/bestTypes"
import BestTop1Card from "@/components/best/molecule/BestTop1Card"
import BestTop4Card from "@/components/best/molecule/BestTop4Card"

interface BestListProps<T> {
	data: T
}
function BestTop5({ data }: BestListProps<RenderedRankingItemTypes[]>) {
	const top1Data = data[0]
	const restData = data.slice(1, 5)
	return (
		<div className="container mx-auto p-8">
			<div className="grid grid-cols-1 gap-8">
				<div className="flex justify-center">
					<BestTop1Card key={top1Data.memberUuid} {...top1Data} isTopRanked />
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
					{restData.map((creator) => (
						<BestTop4Card key={creator.memberUuid} {...creator} />
					))}
				</div>
			</div>
		</div>
	)
}

export default BestTop5
