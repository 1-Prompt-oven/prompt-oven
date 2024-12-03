"use server"

import { isValidResponse } from "@/lib/api/validation"
import type { PromptsType } from "@/types/prompts/promptsType"

interface RawData {
	result: {
		productList: PromptsType[]
	}
}

export async function getPromptList(): Promise<PromptsType[]> {
	const res = await fetch(`${process.env.API_BASE_URL}/v1/product/list`, {
		method: "GET",
	})

	if (!res.ok) {
		throw new Error("Failed to fetch product list data")
	}

	const rawData: RawData = await res.json() // RawData 타입으로 지정

	if (!isValidResponse<RawData>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result.productList
}
