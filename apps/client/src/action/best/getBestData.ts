"use server"

import { BestCreatorDatas } from "@/dummy/best/bestCreatorData"
import { BestCreatorDatas2 } from "@/dummy/best/updatedBestCreatorData"
import type {
	BestCreatorCursorListTypes,
	BestCreatorCursorListTypes2,
} from "@/types/best/bestTypes"

interface FetchBestCreatorsParams {
	lastRanking: number
	pageSize: number
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

export async function updatedGetBestCreatorData(
	params?: FetchBestCreatorsParams,
): Promise<BestCreatorCursorListTypes2> {
	const _query = params
	const res: BestCreatorCursorListTypes2 = await BestCreatorDatas2

	// const params = new URLSearchParams()
	// if (_query?.lastRanking) params.append('lastRanking', _query?.lastRanking)
	// if (_query?.pageSize) params.append('pageSize', _query?.pageSize)

	// const fetchUrl = `${process.env.API_BASE_URL}/v1/seller-batch/aggregate/bestSellers?${params.toString()}`

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

