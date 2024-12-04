import type { NextRequest} from "next/server";
import { NextResponse } from "next/server"

export const handleCreateProduct = (
	request: NextRequest,
): NextResponse | undefined => {
	const { searchParams } = request.nextUrl
	if (searchParams.get("view") === "create-product") {
		const url = request.nextUrl.clone()

		// Add step=1 to query parameters
		url.searchParams.set("step", "1")

		// Check for memberUuid cookie and add it to query parameters if present
		const memberUuid = request.cookies.get("memberUuid")?.value
		if (memberUuid) {
			url.searchParams.set("memberUuid", memberUuid)
		}

		return NextResponse.redirect(url)
	}
}