import type { NextRequest, NextResponse } from "next/server"
import { handleCreateProduct } from "@/middleware/productMiddleware.ts"
import { withAuthRoutes } from "@/config/auth/route.ts"

export const normalizeRegex = /\/$/

export const getNormalizedPathname = (pathname: string): string => {
	return pathname.replace(normalizeRegex, "").toLowerCase()
}

type RouterHandlerType = (req: NextRequest) => NextResponse | undefined

const routeHandlers: Record<string, RouterHandlerType | undefined> = {
	[withAuthRoutes.account]: handleCreateProduct,
	// Add other routes and their handlers here
}

export const handleWithAuthRequest = async (req: NextRequest) => {
	const { pathname } = req.nextUrl
	const normalizedPathname = getNormalizedPathname(pathname)
	const handler = routeHandlers[normalizedPathname]

	if (handler) return handler(req)
}
