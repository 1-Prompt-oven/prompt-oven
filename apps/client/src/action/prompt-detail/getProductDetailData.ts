"use server"

import { getAuthHeaders } from "@/lib/api/headers"
import { getMemberUUID } from "@/lib/api/sessionExtractor"
import { isValidResponse } from "@/lib/api/validation"
import type {
	ProfileDetailSellorShortType,
	PromptDetailCartStateType,
	PromptDetailFavoriteStateType,
	PromptDetailInfoType,
} from "@/types/prompt-detail/promptDetailType"

interface DetailData {
	result: PromptDetailInfoType
}

interface SellorShortData {
	result: ProfileDetailSellorShortType
}

interface FavoriteStateData {
	result: PromptDetailFavoriteStateType
}

export async function getProductDetail(
	productId: string,
): Promise<PromptDetailInfoType> {
	"use server"
	const headers = await getAuthHeaders()
	//const memberUUID = getMemberUUID()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/product/${productId}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch product list data")
	}

	const rawData: DetailData = await res.json() // RawData 타입으로 지정

	if (!isValidResponse<DetailData>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}

export async function getSellorShort(
	memberId: string,
): Promise<ProfileDetailSellorShortType> {
	"use server"
	const headers = await getAuthHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/profile/uuid/${memberId}/short`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch memberShort Data")
	}

	const rawData: SellorShortData = await res.json() // RawData 타입으로 지정

	if (!isValidResponse<SellorShortData>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}

export async function getFavoriteState(
	productId: string,
): Promise<PromptDetailFavoriteStateType> {
	"use server"
	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/product/like/${memberUUID}/${productId}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch FavoriteState Data")
	}

	const rawData: FavoriteStateData = await res.json() // RawData 타입으로 지정

	if (!isValidResponse<FavoriteStateData>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}

export async function changeFavoriteAction(
	productUUID: string,
): Promise<PromptDetailFavoriteStateType> {
	"use server"
	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/product/like`,
		{
			method: "PUT",
			headers,
			body: JSON.stringify({
				memberUuid: memberUUID,
				productUuid: productUUID,
			}),
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch FavoriteState Data")
	}

	const rawData: FavoriteStateData = await res.json() // RawData 타입으로 지정

	if (!isValidResponse<FavoriteStateData>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}

export async function getCartState(productUUID: string): Promise<boolean> {
	"use server"
	const memberUUID = await getMemberUUID()
	const headers = await getAuthHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/cart/exist?memberUuid=${memberUUID}&productUuid=${productUUID}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch Cart State Data")
	}

	const rawData: PromptDetailCartStateType = await res.json() // RawData 타입으로 지정

	return rawData.result
}
