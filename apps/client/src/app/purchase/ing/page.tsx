import { getPaymentList } from "@/action/purchase/purchase-ing"
import PurchaseIngTemplate from "@/components/purchase-ing/template/PurchaseIngTemplate"

export default async function PurchaseIng() {
	const paymentList = await getPaymentList()

	return (
		<section className="container mx-auto bg-[#111111] py-1">
			<PurchaseIngTemplate paymentList={paymentList} />
		</section>
	)
}
