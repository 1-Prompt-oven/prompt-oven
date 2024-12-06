"use server"

import type {
	PromptReviewType,
	PromptSimpleReviewData,
} from "@/types/review/reviewType"
import { getAuthHeaders } from "@/lib/api/headers"
import { isValidResponse } from "@/lib/api/validation"
import { createQueryParamString } from "@/lib/query"

export async function getReviewSimpleData(
	productUUID: string,
): Promise<PromptSimpleReviewData> {
	"use server"
	const headers = await getAuthHeaders()
	//const memberUUID = getMemberUUID()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/review-aggregate/${productUUID}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch Review Simple Data")
	}

	const rawData: PromptSimpleReviewData = await res.json() // RawData 타입으로 지정

	if (!isValidResponse<PromptSimpleReviewData>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}

export async function getProductReview(
	productUUID: string,
	nextPage?: number,
): Promise<PromptReviewType> {
	"use server"
	const headers = await getAuthHeaders()
	//const memberUUID = getMemberUUID()

	const payload = {
		productUuid: productUUID,
		page: nextPage ? nextPage : 1,
	}

	const query = createQueryParamString(payload)

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/review-read?${query}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch Review List Data")
	}

	const rawData: PromptReviewType = await res.json() // RawData 타입으로 지정

	if (!isValidResponse<PromptReviewType>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}
