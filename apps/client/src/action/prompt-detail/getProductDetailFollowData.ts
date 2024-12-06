"use server"

import { getAuthHeaders } from "@/lib/api/headers"
import { getMemberUUID, getNickname } from "@/lib/api/sessionExtractor"
import { revalidateTag } from "next/cache"

interface FollowingStateData {
	result: boolean
}

export async function getFollowingState(
	sellerNickname: string,
): Promise<boolean> {
	"use server"

	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()

	if (!memberUUID) return false

	const memberNickname = await getNickname()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/profile/relation/${memberNickname}/${sellerNickname}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch Following State Data")
	}

	const rawData: FollowingStateData = await res.json()

	return rawData.result
}

export async function sellorFollowAction(
	sellerNickname: string,
): Promise<boolean> {
	"use server"

	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()

	if (!memberUUID) return false

	const payload = {
		followerId: memberUUID,
	}

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/profile/follow/${sellerNickname}`,
		{
			method: "POST",
			headers,
			body: JSON.stringify(payload),
		},
	)

	if (!res.ok) {
		//throw new Error("Failed to fetch Following State Data")
		return false
	}
	revalidateTag("chageFollowing")
	return true
}

export async function sellorUnFollowAction(
	sellerNickname: string,
): Promise<boolean> {
	"use server"

	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()

	if (!memberUUID) return false

	const payload = {
		followerId: memberUUID,
	}

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/profile/unfollow/${sellerNickname}`,
		{
			method: "POST",
			headers,
			body: JSON.stringify(payload),
		},
	)

	if (!res.ok) {
		//throw new Error("Failed to fetch Following State Data")
		return false
	}
	revalidateTag("chageFollowing")
	return true
}
