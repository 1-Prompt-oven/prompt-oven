import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"

// Function to create headers with optional access token
export function initializeHeaders(accessToken?: string): HeadersInit {
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	}
	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`
	}
	return headers
}

export function initHeaders(
	accessToken?: string,
	contentType = "application/json",
): Headers {
	const headers = new Headers()

	if (contentType !== "none") {
		headers.set("Content-Type", contentType)
	}

	if (accessToken) {
		headers.set("Authorization", `Bearer ${accessToken}`)
	}

	return headers
}

// Original function maintained for backward compatibility
export async function getAuthHeaders(): Promise<HeadersInit> {
	"use server"
	const session = await getServerSession(authOptions)
	if (session) {
		const userObj = session as { user?: { accesstoken?: unknown } }
		const accessToken = userObj.user?.accesstoken

		if (typeof accessToken === "string") {
			return initializeHeaders(accessToken)
		}
	}
	return initializeHeaders()
}
