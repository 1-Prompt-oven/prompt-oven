"use server"

import { getServerSession } from "next-auth"
import {
	authOptions,
	updateSession,
} from "@/app/api/auth/[...nextauth]/authOption.ts"
import { getRefreshToken } from "@/lib/api/sessionExtractor.ts"
import { refreshAccessToken } from "@/action/auth/authTokenAction.ts"
import type { RefreshResponse } from "@/types/auth/AuthToken.ts"
import { getToken } from "next-auth/jwt"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export const refreshAccessTokenAfterRoleChange = async (): Promise<{
	success: boolean
	error: string
}> => {
	"use server"
	const session = await getServerSession(authOptions)
	const refreshToken = await getRefreshToken()
	if (!session) {
		throw new Error("Not authenticated")
	}

	try {
		const res: RefreshResponse = await refreshAccessToken(
			refreshToken as string,
		)

		session.user.accesstoken = res.result.accessToken
		session.user.role = res.result.role
		session.user.nickname = res.result.nickname

		// Get the current JWT token
		const token = await getToken({
			req: { cookies: cookies() } as any,
			secret: process.env.NEXTAUTH_SECRET,
		})
		if (!token) {
			throw new Error("No token found")
		}

		const updatedToken = {
			...token,
			accessToken: session.user.accesstoken,
			role: session.user.role,
			nickname: session.user.nickname,
		}

		await updateSession(updatedToken, session.user, session)

		// // 전체 애플리케이션 경로 재검증 -- validation 해야할 부분이 있다면 추가하기
		revalidatePath("/")

		return { success: true, error: "" }
	} catch (error) {
		// eslint-disable-next-line no-console -- 오류 출력
		console.error("Error refreshing token:", error)
		return {
			success: false,
			error: "Failed to refresh token after change role",
		}
	}
}
