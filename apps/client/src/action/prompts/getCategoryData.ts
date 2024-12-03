"use server"

import { isValidResponse } from "@/lib/api/validation"
import type { CategoryType } from "@/types/prompts/categoryType"

export async function getCategory(): Promise<CategoryType[]> {
	"use server"
	//const headers = await getAuthHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/product/category/sub-categories`,
		{
			method: "GET",
			// headers,
			// next: { revalidate: 3600 },
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch Category data")
	}

	const rawData: unknown = await res.json()

	if (!isValidResponse<CategoryType[]>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}

export async function getSubCategory(
	parentCategoryUuid: string,
): Promise<CategoryType[]> {
	"use server"
	//const headers = await getAuthHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/product/category/sub-categories?parentCategoryUuid=${parentCategoryUuid}`,
		{
			method: "GET",
			// headers,
			// next: { revalidate: 3600 },
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch SubCategory data")
	}

	const rawData: unknown = await res.json()

	if (!isValidResponse<CategoryType[]>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}
