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

interface SearchParamsProps {
	searchParams: {
		searchBar?: string // 검색어
		topCategoryUuid?: string // 상위 카테고리 UUID
		subCategoryUuid?: string // 하위 카테고리 UUID
		minPrice?: string // 최소 가격
		maxPrice?: string // 최대 가격
		sortBy?: string // 정렬 기준
		sortOption?: string // 정렬 옵션 (예: ASC, DESC)
	}
}

interface LlmData {
	result: {
		llmName: string
	}
}

export async function getPromptList(
	searchParams: SearchParamsProps,
): Promise<PromptsType> {
	"use server"

	const payload = {
		searchBar: searchParams.searchParams.searchBar || "",
		topCategoryUuid: searchParams.searchParams.topCategoryUuid || "",
		subCategoryUuid: searchParams.searchParams.subCategoryUuid || "",
		enable: true,
		minPrice: searchParams.searchParams.minPrice
			? parseInt(searchParams.searchParams.minPrice)
			: 0,
		maxPrice: searchParams.searchParams.maxPrice || "",
		sortOption: searchParams.searchParams.sortOption || "createdAt",
		sortBy: searchParams.searchParams.sortBy || "DESC",
		cursorId: "",
	}

	const query = createQueryParamString(payload)

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/product/list?${query}`,
		{
			method: "GET",
			headers: initializeHeaders(),
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch getPromptList list data")
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

export async function getUpdatePromptList(
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
		throw new Error("Failed to fetch getUpdatePromptList list data")
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
