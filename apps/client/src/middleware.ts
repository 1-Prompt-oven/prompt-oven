import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { routes } from "@/config/auth/route.ts"
// import { handleWithAuthRequest } from "@/middleware/commonMiddleware.ts"
const withAuth = async (req: NextRequest, token: boolean) => {
	const url = req.nextUrl.clone()
	const { pathname } = req.nextUrl
	if (!token) {
		url.pathname = routes.signIn
		// url.basePath = routes.signUp
		url.search = `callbackUrl=${pathname}`
		return NextResponse.redirect(url)
	}
}

const FALLBACK_URL = "/"
const withOutAuth = async (
	req: NextRequest,
	token: boolean,
	to: string | null,
) => {
	const url = req.nextUrl.clone()
  if (token) {
    url.pathname = to ?? FALLBACK_URL;
    url.search = "";

    return NextResponse.redirect(url);
  } 
}
	// return handleWithAuthRequest(req)
const withAuthList: string[] = [routes.cart, routes.profile, routes.favorite, routes.settings]
const withOutAuthList: string[] = [routes.signIn, routes.signUp]

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
