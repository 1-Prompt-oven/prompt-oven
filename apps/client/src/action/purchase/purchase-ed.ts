"use server"

import { getAuthHeaders } from "@/lib/api/headers"
import { getMemberUUID } from "@/lib/api/sessionExtractor"
import { createQueryParamString } from "@/lib/query"
import type {
	PromptPurchasedProps,
	PromptPurchaseFinalInfoProps,
	PromptPurchaseShortProps,
	PurchaseSearchByPurchaseUuidProps,
	PurchaseSearchWithDetailProps,
} from "@/types/purchase.ts/purchase-ongoing"
import { getProductDetail } from "../prompt-detail/getProductDetailData"

interface PurchasedProps {
	result: PromptPurchasedProps
}

interface ShortProps {
	result: PromptPurchaseShortProps
}

interface SearchProps {
	result: PurchaseSearchByPurchaseUuidProps[]
}

// export async function getPurchaseEd(): Promise<PromptPurchasedProps> {
export async function getPurchaseEd(
	cursorId?: number,
): Promise<PromptPurchaseFinalInfoProps> {
	"use server"

	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()

	const payload: {
		memberUuid: string
		pageSize: number
		lastPurchaseId?: number
	} = {
		memberUuid: memberUUID as string,
		pageSize: 4,
	}

	if (cursorId) {
		payload.lastPurchaseId = cursorId
	}

	const query = createQueryParamString(payload)

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/purchase/list?${query}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch purchased list data")
	}

	const rawData: PurchasedProps = await res.json() // RawData 타입으로 지정

	// return rawData.result as PromptPurchasedProps
	const purchases = rawData.result

	// 각 content 항목에 대해 getShortPurchaseEd 호출
	const updatedContent = await Promise.all(
		purchases.content.map(async (item) => {
			const shortData = await getShortPurchaseEd(item.paymentId.toString())
			return {
				...item,
				shortData,
			}
		}),
	)

	const updatedContentWithInfo = {
		purchaseList: updatedContent,
		nextCursor: purchases.nextCursor,
		hasNext: purchases.hasNext,
		pageSize: purchases.pageSize,
		page: purchases.page,
	}

	return updatedContentWithInfo
}

export async function getShortPurchaseEd(
	paymentId: string,
): Promise<PromptPurchaseShortProps> {
	"use server"

	const headers = await getAuthHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/payment/${paymentId}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch purchased short data")
	}

	const rawData: ShortProps = await res.json() // RawData 타입으로 지정

	return rawData.result
}

export async function getSearchPurchase(
	purchaseUuid: string,
): Promise<PurchaseSearchWithDetailProps[]> {
	"use server"

	const headers = await getAuthHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/member/purchase/products/${purchaseUuid}`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch purchase data by purchaseUuid")
	}

	const rawData: SearchProps = await res.json() // RawData 타입으로 지정

	const purchases = rawData.result

	const updatedSearch = await Promise.all(
		purchases.map(async (purchase: PurchaseSearchByPurchaseUuidProps) => {
			const productDetail = await getProductDetail(purchase.productUuid)
			return {
				...purchase,
				productDetail,
			}
		}),
	)

	return updatedSearch
}
