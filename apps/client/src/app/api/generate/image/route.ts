import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_SECRET_KEY,
})

export async function POST(res: Request) {
	const { keyWord } = await res.json()

	try {
		const response = await openai.images.generate({
			model: "dall-e-3", // ai model
			prompt: keyWord, // input에서 입력한 keyWord
			n: 1, // 이미지 개수
			size: "1024x1024", // 이미지 크기
		})

		return new NextResponse(JSON.stringify(response), { status: 200 })
	} catch (err) {
		return new NextResponse("Sever Error", { status: 500 })
	}
}
