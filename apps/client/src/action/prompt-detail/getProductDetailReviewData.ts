"use server"

import { revalidateTag } from "next/cache"
import { getAuthHeaders } from "@/lib/api/headers"
import { isValidResponse } from "@/lib/api/validation"
import { createQueryParamString } from "@/lib/query"
import type {
	PromptReviewType,
	PromptSimpleReviewData,
} from "@/types/review/reviewType"
import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import {
	getMemberUUID,
	getNickname,
	getProfileImage,
} from "@/lib/api/sessionExtractor"

export async function getReviewSimpleData(
	productUUID: string,
): Promise<PromptSimpleReviewData> {
	"use server"
	const headers = await getAuthHeaders()
	//const memberUUID = await getMemberUUID()

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
	createAt?: string,
	last?: string,
	nextPage?: number,
): Promise<PromptReviewType> {
	"use server"
	const headers = await getAuthHeaders()
	//const memberUUID = await getMemberUUID()

	const payload = {
		productUuid: productUUID,
		lastCreatedAt: createAt ? createAt : "",
		lastId: last ? last : "",
		page: nextPage ? nextPage : 1,
	}

	const query = createQueryParamString(payload)

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/review-read?${query}`,
		{
			method: "GET",
			headers,
			next: { tags: ["write-review", "modify-review", "delete-review"] },
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

export async function writeReviewAction(
	productData: PromptDetailInfoType,
	contents: string,
	star: number,
): Promise<boolean> {
	"use server"
	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()
	const memberProfile = await getProfileImage()
	const memberNickname = await getNickname()

	const payload = {
		productUuid: productData.productUuid,
		sellerUuid: productData.sellerUuid,
		authorUuid: memberUUID,
		authorProfileImage: memberProfile,
		authorNickname: memberNickname,
		contents,
		star,
	}

	const res = await fetch(`${process.env.API_BASE_URL}/v1/member/review`, {
		method: "POST",
		headers,
		body: JSON.stringify(payload),
	})

	if (!res.ok) {
		// throw new Error("Failed to fetch Write Review Data")
		return false
	}

	revalidateTag("write-review")
	return true
}

export async function modifyReviewAction(
	reviewId: string,
	contents: string,
	star: number,
): Promise<boolean> {
	"use server"
	const headers = await getAuthHeaders()

	const payload = {
		id: reviewId,
		contents,
		star,
	}

	const res = await fetch(`${process.env.API_BASE_URL}/v1/member/review`, {
		method: "PUT",
		headers,
		body: JSON.stringify(payload),
	})

	if (!res.ok) {
		// throw new Error("Failed to fetch Modify Review Data")
		return false
	}

	revalidateTag("modify-review")
	return true
}

export async function deleteReviewAction(reviewId: string): Promise<boolean> {
	"use server"
	const headers = await getAuthHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/review/${reviewId}`,
		{
			method: "DELETE",
			headers,
		},
	)

	if (!res.ok) {
		// throw new Error("Failed to fetch Delete Review Data")
		return false
	}

	revalidateTag("delete-review")
	return true
}
