"use server"

import type { ProfileModifyType } from "@/types/profile/profileTypes"
import { getAuthHeaders } from "@/lib/api/headers"

export async function modifyProfileData(data: ProfileModifyType) {
    const headers = await getAuthHeaders()
    const res = await fetch(`${process.env.API_BASE_URL}/v1/member/profile`, {
		method: "PUT",
		headers,
		body: JSON.stringify(data),
	})

    if (!res.ok) {
		throw new Error('Failed to modify profile data')
	}

}
