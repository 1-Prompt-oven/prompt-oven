import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_SECRET_KEY,
})

export async function POST(res: Request) {
	const { keyWord } = await res.json()

	try {
		const response = await openai.chat.completions.create({
			messages: keyWord,
			model: "gpt-3.5-turbo",
			stream: true,
			max_tokens: 100,
		})

		return new NextResponse(JSON.stringify(response), { status: 200 })
	} catch (err) {
		return new NextResponse("Sever Error", { status: 500 })
	}
}
