import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const handleCreateProduct = (
	request: NextRequest,
): NextResponse | undefined => {
	const { searchParams } = request.nextUrl
	const baseCheck = searchParams.get("view") === "create-product"

	// 상품 등록 첫 번째 진입점
	if (baseCheck && !searchParams.get("step")) {
		const url = request.nextUrl.clone()
		// Add step=1 to query parameters
		url.searchParams.set("step", "1")
		return NextResponse.redirect(url)
	}
}
