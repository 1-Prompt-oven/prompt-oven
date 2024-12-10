import { getMemberUUID } from "@/lib/api/sessionExtractor"
import type { PaymentItemType } from "@/types/purchase.ts/purchase-ongoing"
import {
	getAllCartNumber,
	getProductDetail,
} from "../prompt-detail/getProductDetailData"

export async function getPaymentList(): Promise<PaymentItemType[]> {
	const memberUUID = await getMemberUUID()
	if (!memberUUID) return [] // UUID가 없을 경우 빈 배열 반환

	const res = await getAllCartNumber()

	const productDetails = await Promise.all(
		res.map(async (item) => {
			const detail = await getProductDetail(item.productUuid)
			// 필요한 속성만 반환
			return {
				productUUID: detail.productUuid,
				productName: detail.productName,
				productPrice: detail.price,
			}
		}),
	)

	return productDetails
}
