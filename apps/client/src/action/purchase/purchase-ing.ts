"use server"

import { revalidateTag } from "next/cache"
import { getMemberUUID } from "@/lib/api/sessionExtractor"
import { getAuthHeaders } from "@/lib/api/headers"
import type {
	PaymentItemType,
	RequestPaymentType,
} from "@/types/purchase.ts/purchase-ongoing"
import {
	getAllCartNumber,
	getProductDetail,
} from "../prompt-detail/getProductDetailData"
import { deleteCartItemList } from "../cart/cartAction"

// interface PurchaseItem {
// 	productUUID: string
// }

export async function getPaymentList(): Promise<PaymentItemType[]> {
	"use server"
	const memberUUID = await getMemberUUID()
	if (!memberUUID) return [] // UUID가 없을 경우 빈 배열 반환

	const res = await getAllCartNumber()
	const selectedIds = res.filter((item) => item.selected)

	const productDetails = await Promise.all(
		selectedIds.map(async (item) => {
			const detail = await getProductDetail(item.productUuid)
			// 필요한 속성만 반환
			return {
				productUUID: detail.productUuid,
				productName: detail.productName,
				productPrice: String(detail.price),
			}
		}),
	)

	return productDetails
}

export async function allDeleteNoCheckCart() {
	"use server"

	const cartList = await getAllCartNumber()

	const selectedIds = cartList
		.filter((item) => item.selected) // selected가 true인 항목 필터링
		.map((item) => item.id) // id만 추출

	const result = await deleteCartItemList(selectedIds)
	revalidateTag("updateCarts")
	return result
}

export async function appendPurchased(
	paymentData: RequestPaymentType,
): Promise<boolean> {
	"user server"

	const headers = await getAuthHeaders()
	const memberUUID = await getMemberUUID()

	const productUUIDs: string[] = paymentData.purchaseList.map(
		(item: PaymentItemType) => item.productUUID,
	)

	const payload = {
		memberUuid: memberUUID,
		purchaseList: productUUIDs,
		totalAmount: paymentData.totalAmount,
		message: paymentData.message,
		orderId: paymentData.orderId,
		orderName: paymentData.orderName,
		paymentMethod: paymentData.paymentMethod,
		paymentWay: paymentData.paymentWay,
		requestedAt: new Date(paymentData.requestedAt).toISOString(),
		approvedAt: new Date(paymentData.approvedAt).toISOString(),
	}

	const res = await fetch(`${process.env.API_BASE_URL}/v1/payment/product`, {
		method: "POST",
		headers,
		body: JSON.stringify(payload),
	})

	if (!res.ok) {
		throw new Error("Failed to fetch POST purchase list data")
	}

	return true
}
