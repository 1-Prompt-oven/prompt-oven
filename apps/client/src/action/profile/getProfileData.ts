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

	const res = await fetch(`${process.env.API_BASE_URL}/v1/profile/nickname/${id}`, {
		method: "GET",
		headers,
		next: { revalidate: 3600 }, // 1 hour in seconds
	})

	if (!res.ok) {
		throw new Error('Failed to fetch profile data')
	}

	const rawData: unknown = await res.json()
	
	function isValidResponse(data: unknown): data is { result: ProfileMemberInfoType } {
		return (
			typeof data === 'object' && 
			data !== null && 
			'result' in data &&
			typeof (data as { result: unknown }).result === 'object'
		)
	}

	if (!isValidResponse(rawData)) {
		throw new Error('Invalid response format')
	}

	return rawData.result
}

export async function getProfileMemberInfoByUuid(
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
		cache: 'force-cache',
		next: { revalidate: 3600 }, // 1 hour in seconds
	})

	if (!res.ok) {
		throw new Error('Failed to fetch profile data')
	}

	const rawData: unknown = await res.json()
	
	function isValidResponse(data: unknown): data is { result: ProfileMemberInfoType } {
		return (
			typeof data === 'object' && 
			data !== null && 
			'result' in data &&
			typeof (data as { result: unknown }).result === 'object'
		)
	}

	if (!isValidResponse(rawData)) {
		throw new Error('Invalid response format')
	}

	return rawData.result
}

// 프로필에서 보일 상품 목록 데이터 : product service에서 가져와야 함
export async function getProfileList(): Promise<PromptsType[]> {
	const res: PromptsType[] = await profileListData
	return res
}