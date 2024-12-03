"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import type { ProfileModifyType } from "@/types/profile/profileTypes"
import { initializeHeaders } from "@/lib/api/headers"
import { getAccessToken } from "@/lib/api/sessionExtractor"

export async function modifyProfileData(data: ProfileModifyType) {
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	const res = await fetch(`${process.env.API_BASE_URL}/v1/member/profile`, {
		method: "PUT",
		headers,
		body: JSON.stringify(data),
	})

	if (!res.ok) {
		throw new Error("Failed to modify profile data")
	}
	// this will revalidate the profile page
	revalidateTag('profile')
	revalidatePath(`/profile/${data.nickname}`)
	revalidatePath(`/profile/modify/${data.memberUUID}`)

}
