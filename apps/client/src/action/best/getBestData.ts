"use server"

import type {
	BestCreatorCursorListTypes,
	BestCreatorCursorListTypes2,
} from "@/types/best/bestTypes"
import type { CommonResType2 } from "@/types/common/responseType"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"

interface FetchBestCreatorsParams {
	lastRanking?: number
	pageSize?: number
	date: string
}

export async function fetchRankingList(
	params: FetchBestCreatorsParams,
): Promise<BestCreatorCursorListTypes2> {
	"use server"
	try {
		const now = new Date()
		const midnight = new Date()
		midnight.setHours(24, 0, 0, 0) // 자정 시간 설정
		const secondsUntilMidnight = Math.floor(
			(midnight.getTime() - now.getTime()) / 1000,
		)
		// 1. 베스트 API 호출
		const bestResponse = await fetch(
			`${process.env.API_BASE_URL}/v1/seller-batch/aggregate/bestSellers?date=${params.date}&pageSize=20&lastRanking=${params.lastRanking}`,
			{
				next: { revalidate: secondsUntilMidnight },
			},
		)
		if (!bestResponse.ok) {
			throw new Error("Failed to fetch best ranking data")
		}
		const bestData =
			(await bestResponse.json()) as CommonResType2<BestCreatorCursorListTypes>
		// 2. 프로필 API 병렬 호출
		const profilePromises = bestData.result.content.map(async (bestItem) => {
			const profileResponse = await fetch(
				`${process.env.API_BASE_URL}/v1/profile/uuid/${bestItem.memberUuid}`,
				{
					next: { revalidate: secondsUntilMidnight },
				},
			)
			if (!profileResponse.ok) {
				throw new Error(
					`Failed to fetch profile for UUID: ${bestItem.memberUuid}`,
				)
			}
			const profileData =
				(await profileResponse.json()) as CommonResType2<ProfileMemberInfoType>

			// 3. 데이터 결합
			return {
				memberUuid: bestItem.memberUuid,
				ranking: bestItem.ranking,
				rankingChange: bestItem.rankingChange,
				dailySellsCount: bestItem.dailySellsCount,
				reviewAvg: bestItem.reviewAvg,
				date: bestItem.date,
				totalSales: bestItem.sellsCount,
				avatarImage: profileData.result.avatarImageUrl || "/img/main/art3.png",
				nickname: profileData.result.nickname,
				follower: profileData.result.follower,
				hashTag: profileData.result.hashTag || "크리에이터 태그",
				views: profileData.result.viewer,
			}
		})

		// 4. 모든 프로필 데이터 병렬 처리
		const renderedData = await Promise.all(profilePromises)
		return {
			content: renderedData,
			nextCursor: bestData.result.nextCursor,
			hasNext: bestData.result.hasNext,
			pageSize: params.pageSize || 20,
			page: 1,
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Failed to fetch ranking list: ${errorMessage}`)
	}
}

export const followAction = async (_memberUUID: string) => {
	// const response = await fetch(
	// 	`${process.env.API_BASE_URL}/v1/member/follow`,
	// 	{
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ memberUUID }),
	// 	},
	// )

	// if (!response.ok) {
	// 	throw new Error(`HTTP Error: ${response.status}`)
	// }

	// const data = await response.json()
	// console.log("팔로우 성공:", data)
	return true
}
