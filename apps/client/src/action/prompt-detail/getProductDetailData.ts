"use server"

import { revalidateTag } from "next/cache"
import { getAuthHeaders } from "@/lib/api/headers"
import { getMemberUUID } from "@/lib/api/sessionExtractor"
import { isValidResponse } from "@/lib/api/validation"
import type {
	ProfileDetailSellorShortType,
	PromptDetailCartAllNumberType,
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

interface AllCartNumberData {
	result: PromptDetailCartAllNumberType[]
}

interface ResponseLikeData {
	result: { res: boolean; state: string }
}

interface ResponseCartData {
	result: { res: boolean; state: string; cartId: number | null }
}

export async function getProductDetail(
	productId: string,
): Promise<PromptDetailInfoType> {
	"use server"
	const headers = await getAuthHeaders()
	//const memberUUID = await getMemberUUID()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/product/${productId}`,
		{
			method: "GET",
			headers,
			next: { tags: ["updateFavorite"] },
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
		throw new Error("Failed to fetch sellorShort Data")
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

	if (!memberUUID) return { liked: false }

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
): Promise<ResponseLikeData> {
	"use server"
	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()

	if (!memberUUID) return { result: { res: false, state: "NoUser" } }

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
		// throw new Error("Failed to fetch FavoriteState Data")
		return { result: { res: false, state: "resError" } }
	}
	revalidateTag("updateFavorite")
	return { result: { res: true, state: "success" } }
}

export async function getCartStateAction(
	productUUID: string,
): Promise<number | null> {
	"use server"
	const memberUUID = await getMemberUUID()
	const headers = await getAuthHeaders()

	if (!memberUUID) return null

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

	if (rawData.result) {
		const allNumberArray = await getAllCartNumber()
		const foundItem = allNumberArray.find(
			(item) => item.productUuid === productUUID,
		)
		const cartId = foundItem ? foundItem.id : null // id 값을 찾거나 null 반환
		revalidateTag("updateCarts")
		return cartId
	}
	return null
}

export async function getAllCartNumber(): Promise<
	PromptDetailCartAllNumberType[]
> {
	"use server"

	const memberUUID = await getMemberUUID()
	const headers = await getAuthHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/cart/list/${memberUUID}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch All Cart Number Data")
	}

	const rawData: AllCartNumberData = await res.json() // RawData 타입으로 지정

	return rawData.result
}

export async function createCart(
	productUUID: string,
): Promise<ResponseCartData> {
	"use server"

	const memberUUID = await getMemberUUID()
	const headers = await getAuthHeaders()

	if (!memberUUID)
		return { result: { res: false, state: "NoUser", cartId: null } }

	const payload = {
		memberUuid: memberUUID,
		productUuid: productUUID,
	}

	const res = await fetch(`${process.env.API_BASE_URL}/v1/member/cart`, {
		method: "POST",
		headers,
		body: JSON.stringify(payload),
	})

	if (res.ok) {
		const allNumberArray = await getAllCartNumber()
		const foundItem = allNumberArray.find(
			(item) => item.productUuid === productUUID,
		)
		const newCartId = foundItem ? foundItem.id : null // id 값을 찾거나 null 반환
		revalidateTag("updateCarts")
		return { result: { res: true, state: "success", cartId: newCartId } }
	}
	//throw new Error("Failed to fetch Create Cart Data")
	return { result: { res: false, state: "resError", cartId: null } }
}

export async function changeCartState(
	cartId: number,
): Promise<ResponseCartData> {
	"use server"

	const memberUUID = await getMemberUUID()
	const headers = await getAuthHeaders()

	if (!memberUUID) {
		return { result: { res: false, state: "NoUser", cartId: null } }
	}

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/cart/${cartId}`,
		{
			method: "DELETE",
			headers,
		},
	)

	if (res.ok) {
		revalidateTag("updateCarts")
		return { result: { res: true, state: "success", cartId: null } }
	}

	//throw new Error("Failed to fetch Update Cart Data")
	return { result: { res: false, state: "resError", cartId: null } }
}
