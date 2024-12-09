"use server"

import { getAuthHeaders } from "@/lib/api/headers"
import { getMemberUUID } from "@/lib/api/sessionExtractor"
import { isValidResponse } from "@/lib/api/validation"
import { createQueryParamString } from "@/lib/query"
import type { PromptItemType, PromptsType } from "@/types/prompts/promptsType"
import { getLLMName } from "../prompts/getPromptsData"

interface RawData {
	result: {
		productList: PromptItemType[]
		nextCursorId: string
		hasNext: boolean
	}
}

export async function getFavoriteList(
	cursorId?: string | null,
): Promise<PromptsType> {
	// favoriteFormData?: FormData,
	"use server"

	// if (categoryFormData) {
	// 	categoryFormData.set("enable", "on")
	// }
	// if (cursorId) {
	// 	categoryFormData?.set("cursorId", cursorId)
	// }

	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()

	const payload = {
		memberUuid: memberUUID,
		pageSize: 15,
		cursorId: cursorId ? cursorId : "",
		sortBy: "DESC",
	}

	const query = createQueryParamString(payload)

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/product/like/list?${query}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch favorite list data")
	}

	const rawData: RawData = await res.json() // RawData 타입으로 지정

	if (!isValidResponse<RawData>(rawData)) {
		throw new Error("Invalid response format")
	}

	// LLM 이름을 가져오기 위한 비동기 요청
	const productListWithLLMNames = await Promise.all(
		rawData.result.productList.map(async (product) => {
			const llmName = await getLLMName(product.llmId) // LLM 이름 가져오기
			return { ...product, llmName } // 기존 product에 llmName 추가
		}),
	)

	// LLM 이름이 추가된 productList로 업데이트
	const updatedRawData = {
		...rawData,
		result: {
			...rawData.result,
			productList: productListWithLLMNames,
		},
	}

	return updatedRawData.result
}
