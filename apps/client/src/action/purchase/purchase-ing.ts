import { PaymentList } from "@/dummy/purchase/payment-ongoing"
import type { PaymentItemType } from "@/types/purchase.ts/purchase-ongoing"

export async function getPaymentList(): Promise<PaymentItemType[]> {
	const res: PaymentItemType[] = await PaymentList
	// const res: ProfileMemberInfoType = await profileMemberInfoUndefineData

	//     const res = await fetch(`${process.env.API_BASE_URL}/v1/profile`, {
	//       method: 'GET',
	//       headers: {
	//         'Content-Type': 'application/json',
	//         Authorization: `Bearer ${auth.accessToken}`,
	//       },
	//       cache: 'no-cache',`
	//     })

	return res
}

