import type { NextRequest, NextResponse } from "next/server"
import {
	getNormalizedPathname,
	handleCreateProduct,
} from "@/middleware/productMiddleware.ts"

const routeHandlers: Record<
	string,
	(req: NextRequest) => NextResponse | undefined
> = {
	"/account": handleCreateProduct,
	// Add other routes and their handlers here
}

export const handleWithAuthRequest = (req: NextRequest) => {
	const { pathname } = req.nextUrl
	const normalizedPathname = getNormalizedPathname(pathname)
	const handler = routeHandlers[normalizedPathname]

	return handler(req)
}
