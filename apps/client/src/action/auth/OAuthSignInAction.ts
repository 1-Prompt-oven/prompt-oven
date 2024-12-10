import type {
	OAuthSignInRequest,
	OAuthSignInResponse,
	OAuthUnRegisterRequest,
	SignInResponse,
} from "@/types/auth/OAuthType.ts"
import { actionHandler } from "@/action/actionHandler.ts"
import { isValidResponse } from "@/lib/api/validation"

// todo : 구현 마무리하기 -- 2024.11.12
export const unregisterByOAuth = async (
	req: OAuthUnRegisterRequest,
): Promise<void> => {
	await actionHandler<object>({
		name: "unregisterByOAuth",
		url: "/v1/auth/oauth/unregister",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}

export const signInByOAuth = async (
	reqBody: OAuthSignInRequest,
): Promise<OAuthSignInResponse> => {
	return actionHandler<OAuthSignInResponse>({
		name: "signInByOAuth",
		url: "/v1/auth/social/login",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(reqBody),
			cache: "no-cache",
		},
	})
}

interface SignInParams {
	email: string
	password: string
	sessionId?: string
	version?: 'v1' | 'v2'
}

export async function signInByAuth({
	email,
	password,
	sessionId,
	version = 'v2'
}: SignInParams) : Promise<SignInResponse> {
	try {
		const endpoint = version === 'v2' ? '/v2/auth/login' : '/v1/auth/login'
		const headers: Record<string, string> = {
			'Content-Type': 'application/json'
		}

		// Add sessionId header only for v2
		if (version === 'v2' && sessionId) {
			headers['X-Session-ID'] = sessionId
		}

		const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				email,
				password
			})
		})

		if (!response.ok) {
			const errorData = await response.json()
			// eslint-disable-next-line no-console -- 오류 출력
			console.error('Sign in failed:', errorData)
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()

		if (!isValidResponse<SignInResponse>(data)) {
			throw new Error("Invalid response format")
		}

		return data.result
	} catch (error) {
		// eslint-disable-next-line no-console -- 오류 출력
		console.error('Sign in failed:', error)
		throw error
	}
}
