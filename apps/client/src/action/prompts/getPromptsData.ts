"use server"

import { PromptsListDatas, PromptsTopDatas } from "@/dummy/prompts/promptsDatas"
import type { PromptsType, PromptTopType } from "@/types/prompts/promptsType"

export async function getPromptTop(): Promise<PromptTopType[]> {
	const res: PromptTopType[] = await PromptsTopDatas
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

export async function getPromptList(): Promise<PromptsType[]> {
	const res: PromptsType[] = await PromptsListDatas
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

