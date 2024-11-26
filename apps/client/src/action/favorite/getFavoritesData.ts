"use server"

import { FavoriteListDatas } from "@/dummy/favorite/favoritesDatas"
import type { FavoriteType } from "@/types/favorite/favoriteTypes"

export async function getFavoriteList(): Promise<FavoriteType[]> {
	const res: FavoriteType[] = await FavoriteListDatas
	// const res: ProfileMemberInfoType = await profileMemberInfoUndefineData

	//     const res = await fetch(`${process.env.API_BASE_URL}/v1/profile`, {
	//       method: 'GET',
	//       headers: {
	//         'Content-Type': 'application/json',
	//         Authorization: `Bearer ${auth.accessToken}`,
	//       },
	//       cache: 'no-cache',
	//     })

	return res
}
