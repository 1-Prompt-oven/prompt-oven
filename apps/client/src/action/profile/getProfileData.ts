"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import type { PromptsType } from "@/types/prompts/promptsType"
import { profileListData } from "@/dummy/profile/infoAndListDatas"

export async function getProfileMemberInfo(
	id: string,
): Promise<ProfileMemberInfoType> {
	const session = await getServerSession(authOptions)
	
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	}

	// Add Authorization header only if session exists
	if (session) {
		const userObj = session as { user?: { accesstoken?: unknown } }
		const accessToken = userObj.user?.accesstoken

		if (typeof accessToken === 'string') {
			headers.Authorization = `Bearer ${accessToken}`
		}
	}

	const res = await fetch(`${process.env.API_BASE_URL}/v1/profile/uuid/${id}`, {
		method: "GET",
		headers,
		cache: "no-cache",
	})

	if (!res.ok) {
		throw new Error('Failed to fetch profile data')
	}

	const data = (await res.json()) as ProfileMemberInfoType

	return data
}

export async function getProfileList(): Promise<PromptsType[]> {
	const res: PromptsType[] = await profileListData
	return res
}