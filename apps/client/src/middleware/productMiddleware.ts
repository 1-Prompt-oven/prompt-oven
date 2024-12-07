import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const handleCreateProduct = (
	request: NextRequest,
): NextResponse | undefined => {
	const { searchParams } = request.nextUrl
	const baseCheck = searchParams.get("view") === "create-product"

	// view가 없이 account로 진입했을 때, overview로 리다이렉트
	if (!searchParams.get("view")) {
		const url = request.nextUrl.clone()
		url.searchParams.set("view", "overview")
		return NextResponse.redirect(url)
	}
	// 상품 등록 첫 번째 진입점
	if (baseCheck && !searchParams.get("step")) {
		const url = request.nextUrl.clone()
		// Add step=1 to query parameters
		url.searchParams.set("step", "1")
		return NextResponse.redirect(url)
	}
}
