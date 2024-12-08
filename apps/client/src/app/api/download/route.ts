import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const sample = searchParams.get("sample") // 쿼리 파라미터에서 sample 값을 가져옴

	//const fileName = sample ? `${sample}.png` : 'default.png';
	if (sample === null) return

	const response = NextResponse.redirect(sample, 302)
	response.headers.set(
		"Content-Disposition",
		`attachment; filename="sample_image`,
	)
	response.headers.set("Content-Type", "image/png") // PNG 파일에 맞는 Content-Type으로 설정

	return response
}
