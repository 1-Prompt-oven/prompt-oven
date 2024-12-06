"use server"

import { initializeHeaders } from "@/lib/api/headers"
import { isValidResponse } from "@/lib/api/validation"
import { createQueryParamString } from "@/lib/query"
import type { PromptItemType, PromptsType } from "@/types/prompts/promptsType"

interface RawData {
	result: {
		productList: PromptItemType[]
		nextCursorId: string
		hasNext: boolean
	}
}

interface LlmData {
	result: {
		llmName: string
	}
}

// 카테고리 통합 API
export async function getPromptList(
	categoryFormData?: FormData,
	cursorId?: string | null,
): Promise<PromptsType> {
	"use server"

	if (categoryFormData) {
		categoryFormData.set("enable", "on")
	}
	if (cursorId) {
		categoryFormData?.set("cursorId", cursorId)
	}

	const payload = categoryFormData
		? {
				searchBar: categoryFormData.get("searchBar") || "",
				topCategoryUuid: categoryFormData.get("topCategoryUuid") || "",
				subCategoryUuid: categoryFormData.get("subCategoryUuid") || "",
				enable: categoryFormData.get("enable") === "on",
				minPrice: categoryFormData.get("minPrice") || 0,
				maxPrice: categoryFormData.get("maxPrice") || "",
				sortOption: categoryFormData.get("sortOption") || "createdAt",
				sortBy: categoryFormData.get("sortBy") || "DESC",
				cursorId: categoryFormData.get("cursorId") || "",
			}
		: undefined

	const query = payload ? createQueryParamString(payload) : "enable=true"

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/product/list?${query}`,
		{
			method: "GET",
			headers: initializeHeaders(),
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch product list data")
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

// LLM 이름을 가져오는 함수
export async function getLLMName(llmid: number): Promise<string> {
	"use server"

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/product/llm/${llmid}`,
		{
			method: "GET",
			headers: initializeHeaders(),
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch llm Name data")
	}

	const rawData: LlmData = await res.json() // RawData 타입으로 지정

	if (!isValidResponse<LlmData>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result.llmName
}

//카테고리 통합 전 API
// export async function getPromptList(): Promise<PromptsType> {
// 	"use server"

// 	const res = await fetch(
// 		`${process.env.API_BASE_URL}/v1/product/list?enable=true`,
// 		{
// 			method: "GET",
// 			headers: initializeHeaders(),
// 		},
// 	)

// 	if (!res.ok) {
// 		throw new Error("Failed to fetch product list data")
// 	}

// 	const rawData: RawData = await res.json() // RawData 타입으로 지정

// 	if (!isValidResponse<RawData>(rawData)) {
// 		throw new Error("Invalid response format")
// 	}

// 	return rawData.result
// }

// export async function getPromptListByCategory(
// 	categoryFormData: FormData,
// ): Promise<PromptsType> {
// 	"use server"
// 	categoryFormData.set("enable", "on") //프롬프트 패이지는 활성화된 상품만 보여주도록 한다.

// 	const payload = {
// 		searchBar: categoryFormData.get("searchBar") as string | undefined,
// 		topCategoryUuid: categoryFormData.get("topCategoryUuid") as
// 			| string
// 			| undefined,
// 		subCategoryUuid: categoryFormData.get("subCategoryUuid") as
// 			| string
// 			| undefined,
// 		enable: categoryFormData.get("enable") === "on",
// 		minPrice: categoryFormData.get("minPrice") as string | undefined,
// 		maxPrice: categoryFormData.get("maxPrice") as string | undefined,
// 		sortBy: categoryFormData.get("sortBy") as string | undefined,
// 		sortOption: categoryFormData.get("sortOption") as string | undefined,
// 	}

// 	const query = createQueryParamString(payload)

// 	const res = await fetch(
// 		`${process.env.API_BASE_URL}/v1/product/list?${query}`,
// 		{
// 			method: "GET",
// 		},
// 	)

// 	if (!res.ok) {
// 		throw new Error("Failed to fetch product Category list data")
// 	}

// 	const rawData: RawData = await res.json() // RawData 타입으로 지정

// 	if (!isValidResponse<RawData>(rawData)) {
// 		throw new Error("Invalid response format")
// 	}

// 	return rawData.result
// }
