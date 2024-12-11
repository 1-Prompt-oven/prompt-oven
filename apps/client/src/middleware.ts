import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import {
	commonAuthRoutes,
	withAuthRoutes,
	withOutAuthRoutes,
} from "@/config/auth/route.ts"
import { handleWithAuthRequest } from "@/middleware/commonMiddleware.ts"

// note: 비회원과 회원이 공통으로 접근가능한 route에 대해서는 리다이렉트를 거치지 않는 로직이 추가됨.
const withAuth = async (req: NextRequest, token: boolean) => {
	const url = req.nextUrl.clone()
	const { pathname } = req.nextUrl
	if (!token && !isCommonRoutes(req)) {
		url.pathname = withOutAuthRoutes.signIn // 로그인 페이지로 경로 설정
		// url.basePath = routes.signUp
		url.search = `callbackUrl=${pathname}`
		return NextResponse.redirect(url)
	}

	return handleWithAuthRequest(req)
}

// note: 비회원과 회원이 공통으로 접근가능한 route에 대해서는 리다이렉트를 거치지 않는 로직이 추가됨.
const FALLBACK_URL = "/"
const withOutAuth = async (
	req: NextRequest,
	token: boolean,
	to: string | null,
) => {
	const url = req.nextUrl.clone()
	if (token && !isCommonRoutes(req)) {
		url.pathname = to ?? FALLBACK_URL
		url.search = ""

		return NextResponse.redirect(url)
	}
}

const isCommonRoutes = (req: NextRequest) => {
	const { pathname } = req.nextUrl
	// Normalize the pathname
	const normalizedPathname = pathname.replace(/\/$/, "").toLowerCase()
	return commonAuthList
		.map((route) => route.toLowerCase())
		.includes(normalizedPathname)
}

const withAuthList: string[] = Object.values(withAuthRoutes)
const withOutAuthList: string[] = Object.values(withOutAuthRoutes)
const commonAuthList: string[] = Object.values(commonAuthRoutes)

export default async function middleware(request: NextRequest) {
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	})
	const accessToken = token?.accesstoken
	const { searchParams } = request.nextUrl
	const callbackUrl = searchParams.get("callbackUrl")
	const { pathname } = request.nextUrl

	// Normalize the pathname
	const normalizedPathname = pathname.replace(/\/$/, "").toLowerCase()

	// Check if the normalized pathname is in the withAuthList
	const isWithAuth = withAuthList
		.map((route) => route.toLowerCase())
		.includes(normalizedPathname)

	// Check if the normalized pathname is in the withOutAuthList
	const isWithOutAuth = withOutAuthList
		.map((route) => route.toLowerCase())
		.includes(normalizedPathname)

	if (isWithAuth) return withAuth(request, Boolean(accessToken))
	else if (isWithOutAuth)
		return withOutAuth(request, Boolean(accessToken), callbackUrl)
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)"],
}
