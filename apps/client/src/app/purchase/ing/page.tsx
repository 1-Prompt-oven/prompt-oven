import { getPaymentList } from "@/action/purchase/purchase-ing"
import PurchaseIngTemplate from "@/components/purchase-ing/template/PurchaseIngTemplate"
import type {
	PaymentItemType,
	RequestPaymentType,
} from "@/types/purchase.ts/purchase-ongoing"

export default async function PurchaseIng() {
	const paymentList = await getPaymentList()

	const handlePayment = async (formData: FormData) => {
		"use server"

		const method = formData.get("paymentMethod") as string
		if (!method) {
			return { error: "결제수단 체크는 필수입니다." }
		}
		if (paymentList.length < 1) {
			return { error: "구매할 상품이 존재하지 않습니다." }
		}

		const payload: RequestPaymentType = {
			memberUUID: "1",
			paymentMethod: formData.get("paymentMethod") as string,
			purchaseList: formData
				.getAll("purchaseList")
				.map((item) => {
					if (typeof item === "string") {
						return JSON.parse(item) as PaymentItemType // item이 string일 때만 JSON.parse 호출
					}
					return null // string이 아닐 경우 null 반환
				})
				.filter((item): item is PaymentItemType => item !== null), // null을 제거하여 타입을 보장
			itemCount: parseInt(formData.get("itemCount") as string) || 0,
			totalPrice: parseInt(formData.get("totalPrice") as string) || 0,
			message: formData.get("message") as string,
		}

		// eslint-disable-next-line no-console -- Check Payment Value
		console.log("payload --> ", payload)

		// const res = await ---Action(formData)
		// if (!res) {
		//   return
		// }
		// redirect('/account?view=purchase-completed')
	}

	return (
		<section className="container mx-auto bg-[#111111] py-1">
			<PurchaseIngTemplate
				paymentList={paymentList}
				handlePayment={handlePayment}
			/>
		</section>
	)
}
