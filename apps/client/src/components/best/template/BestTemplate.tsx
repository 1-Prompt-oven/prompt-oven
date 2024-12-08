import React from "react"
import type {
	BestCreatorCursorListTypes2,
	RenderedRankingItemTypes,
} from "@/types/best/bestTypes"
import BestList from "@/components/best/organism/ver2/BestList"
import BestTop5 from "@/components/best/organism/ver2/BestTop5"

interface BestTemplateProps {
	data: BestCreatorCursorListTypes2
}

function BestTemplate({ data }: BestTemplateProps) {
	const top5Data: RenderedRankingItemTypes[] = data.content.slice(0, 5)
	const restData: RenderedRankingItemTypes[] = data.content.slice(5)
	const pagingInfo = {
		nextCursor: data.nextCursor,
		hasNext: data.hasNext,
		pageSize: data.pageSize,
		page: data.page,
	}
	return (
		<>
			<BestTop5 data={top5Data} />

			<BestList data={restData} pagingInfo={pagingInfo} />
		</>
	)
}

export default BestTemplate
