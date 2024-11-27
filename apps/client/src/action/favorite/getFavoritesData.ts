"use server"

import { FavoriteListDatas } from "@/dummy/favorite/favoritesDatas"
import type { PromptsType } from "@/types/prompts/promptsType"

export async function getFavoriteList(): Promise<PromptsType[]> {
	const res: PromptsType[] = await FavoriteListDatas
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
