"use server"

import { isValidResponse } from "@/lib/api/validation"
import type { PromptsType } from "@/types/prompts/promptsType"

export async function getPromptList(): Promise<PromptsType[]> {
	//const res: PromptsType[] = await PromptsListDatas
	//const headers = await getAuthHeaders()

	const res = await fetch(`${process.env.API_BASE_URL}/v1/product/list`, {
		method: "GET",
		// headers,
		// next: { revalidate: 3600 },
	})

	if (!res.ok) {
		throw new Error("Failed to fetch product list data")
	}

	const rawData: unknown = await res.json()

	if (!isValidResponse<PromptsType[]>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}
