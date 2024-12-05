"use server"

import { isValidResponse } from "@/lib/api/validation"
import type { ProfileImageType } from "@/types/profile/profileTypes"

export async function getProfileImage(
	memberUUID: string,
): Promise<ProfileImageType> {
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	}

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/profile/picture/${memberUUID}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch profile image")
	}

	const rawData: unknown = await res.json()

	if (!isValidResponse<ProfileImageType>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}
