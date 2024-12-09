import React from "react"
import BestTemplate from "@/components/best/template/BestTemplate"
import { fetchRankingList } from "@/action/best/getBestData"
import type { BestCreatorCursorListTypes2 } from "@/types/best/bestTypes"
interface FetchBestCreatorsParams {
	lastRanking?: number
	pageSize?: number
	date: string
}

export default async function Page() {
	const params: FetchBestCreatorsParams = {
		date: "2024-12-08",
		pageSize: 10,
		lastRanking: 0,
	}
	const bestData: BestCreatorCursorListTypes2 = await fetchRankingList(params)
	return (
		<section>
			<BestTemplate data={bestData} />
		</section>
	)
}
// 필요한 정보
// 랭킹 -> 베스트
// 순위 변동 -> 베스트
// 판매량-> 베스트
// 평균 별점 -> 베스트
// 선택된 날짜 -> 베스트
// --------------------------
// 프로필 사진 -> 프로필
// 닉네임 -> 프로필
// 팔로워 수 -> 프로필
// 해시태그 -> 프로필
