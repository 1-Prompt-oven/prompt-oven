import type { NextRequest, NextResponse } from "next/server"
import { withAuthRoutes } from "@/config/auth/route.ts"
import { handleAccount } from "@/middleware/productMiddleware.ts"

export const normalizeRegex = /\/$/

export const getNormalizedPathname = (pathname: string): string => {
	return pathname.replace(normalizeRegex, "").toLowerCase()
}

type RouterHandlerType = (req: NextRequest) => NextResponse | undefined

const routeHandlers: Record<string, RouterHandlerType | undefined> = {
	[withAuthRoutes.account]: handleAccount,
	// Add other routes and their handlers here
}

export const handleWithAuthRequest = async (req: NextRequest) => {
	const { pathname } = req.nextUrl
	const normalizedPathname = getNormalizedPathname(pathname)
	const handler = routeHandlers[normalizedPathname]

	if (handler) return handler(req)
}
