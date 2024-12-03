"use server"

import { isValidResponse } from "@/lib/api/validation"
import { createQueryParamString } from "@/lib/query"
import type { PromptsType } from "@/types/prompts/promptsType"

interface RawData {
	result: {
		productList: PromptsType[]
	}
}

export async function getPromptList(): Promise<PromptsType[]> {
	"use server"
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

export async function getPromptListByCategory(categoryFormData: FormData) {
	"use server"
	categoryFormData.set("enable", "on") //프롬프트 패이지는 활성화된 상품만 보여주도록 한다.

	const payload = {
		searchBar: categoryFormData.get("searchBar") as string | undefined,
		topCategoryUuid: categoryFormData.get("topCategoryUuid") as
			| string
			| undefined,
		subCategoryUuid: categoryFormData.get("subCategoryUuid") as
			| string
			| undefined,
		enable: categoryFormData.get("enable") === "on",
		minPrice: categoryFormData.get("minPrice") as string | undefined,
		maxPrice: categoryFormData.get("maxPrice") as string | undefined,
		sortDate: categoryFormData.get("sortDate") as string | undefined,
		sortOption: categoryFormData.get("sortOption") as string | undefined,
	}

	const query = createQueryParamString(payload)

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/product/list?${query}`,
		{
			method: "GET",
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch product Category list data")
	}

	const rawData: RawData = await res.json() // RawData 타입으로 지정

	if (!isValidResponse<RawData>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result.productList
}
