import React from "react"
import type { RenderedRankingItemTypes } from "@/types/best/bestTypes"
import BestList from "@/components/best/organism/ver2/BestList"
import BestTop5 from "@/components/best/organism/ver2/BestTop5"

interface BestTemplateProps {
	data: RenderedRankingItemTypes[]
}

function BestTemplate({ data }: BestTemplateProps) {
	const top5Data: RenderedRankingItemTypes[] = data.slice(0, 5)
	const restData: RenderedRankingItemTypes[] = data.slice(5)
	return (
		<>
			<BestTop5 data={top5Data} />

			<BestList data={restData} />
		</>
	)
}

export default BestTemplate
