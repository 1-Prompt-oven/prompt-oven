import { dummyRankingData } from "@/dummy/best/bestCreatorData2"
import { BestCreatorDatas } from "@/dummy/best/bestCreatorData"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import type {
	BestCreatorCursorListTypes,
	BestCreatorDataType2,
	RenderedRankingItemTypes,
} from "@/types/best/bestTypes"
import { CommonResType2 } from "@/types/common/responseType"

interface FetchBestCreatorsParams {
	lastRanking?: number
	pageSize?: number
	date: string
}

export async function getBestCreatorData(
	params?: FetchBestCreatorsParams,
): Promise<BestCreatorCursorListTypes> {
	const _query = params
	const res: BestCreatorCursorListTypes = await BestCreatorDatas

	// const params = new URLSearchParams()
	// if (_query?.lastCreatedAt) params.append('lastCreatedAt', _query?.lastCreatedAt)
	// if (_query?.lastId) params.append('lastId', _query?.lastId)
	// if (_query?.pageSize) params.append('pageSize', _query?.pageSize.toString())
	// if (_query?.page) params.append('page', _query?.page.toString())

	// const fetchUrl = `${process.env.API_BASE_URL}/v1/creator/best?${params.toString()}`

	// try {
	//   const response = await fetch(fetchUrl, {
	//     method: 'GET',
	//     headers: {
	//       'Content-Type': 'application/json',
	//     },
	//     cache: 'no-cache',
	//   })

	//   if (!response.ok) {
	//     throw new Error('Network response was not ok')
	//   }
	//  const data: BestCreatorCursorListTypes = await response.json()
	//  return data
	// } catch (error) {
	//   console.error('Error:', error)
	//   return
	// }

	return res
}

export async function fetchRankingList(
	_params: FetchBestCreatorsParams,
): Promise<RenderedRankingItemTypes[]> {
	// "use server"
	// try {
	// 	// 1. 베스트 API 호출
	// 	const bestResponse = await fetch(
	// 		`${process.env.API_BASE_URL}/v1/seller-batch/aggregate/bestSellers?date=${params.date}&pageSize=${params.pageSize}&lastRanking${params.lastRanking}`,
	// 	)
	// 	if (!bestResponse.ok) {
	// 		throw new Error("Failed to fetch best ranking data")
	// 	}
	// 	const bestData = (await bestResponse.json()) as CommonResType2<
	// 		BestCreatorDataType2[]
	// 	>

	// 	// 2. 프로필 API 병렬 호출
	// 	const profilePromises = bestData.result.map(async (bestItem) => {
	// 		const profileResponse = await fetch(
	// 			`${process.env.API_BASE_URL}/v1/profile/uuid/${bestItem.memberUuid}`,
	// 		)
	// 		if (!profileResponse.ok) {
	// 			throw new Error(
	// 				`Failed to fetch profile for UUID: ${bestItem.memberUuid}`,
	// 			)
	// 		}
	// 		const profileData =
	// 			(await profileResponse.json()) as CommonResType2<ProfileMemberInfoType>

	// 		// 3. 데이터 결합
	// 		return {
	// 			memberUUID: bestItem.memberUuid,
	// 			ranking: bestItem.ranking,
	// 			rankingChange: bestItem.rankingChange,
	// 			dailySellsCount: bestItem.dailySellsCount,
	// 			avgStar: bestItem.reviewAvg,
	// 			date: bestItem.date,
	// 			avatarImage: profileData.result.avatarImageUrl,
	// 			nickname: profileData.result.nickname,
	// 			follower: profileData.result.follower,
	// 			hashTag: profileData.result.hashTag,
	// 		}
	// 	})

	// 	// 4. 모든 프로필 데이터 병렬 처리
	// 	const renderedData = await Promise.all(profilePromises)
	// 	return renderedData
	// } catch (error) {
	// 	console.error("Error fetching ranking data:", error)
	// 	return []
	// }
	return dummyRankingData
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
