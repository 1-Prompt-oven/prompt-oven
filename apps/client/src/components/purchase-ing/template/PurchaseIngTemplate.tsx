import type { PaymentItemType } from "@/types/purchase.ts/purchase-ongoing"
import PurchaseIngTitle from "../atom/PurchaseIngTitle"
import PaymentDetail from "../organism/PaymentDetail"
import PaymentMethod from "../organism/PaymentMethod"
import PaymentOrder from "../organism/PaymentOrder"

interface PurchaseIngTemplateProps {
	paymentList: PaymentItemType[]
	handlePayment: (FormData: FormData) => void
}

export default function PurchaseIngTemplate({
	paymentList,
	handlePayment,
}: PurchaseIngTemplateProps) {
	return (
		<form action={handlePayment}>
			<div className="mx-6 mb-12 mt-4 max-w-screen-xl">
				<PurchaseIngTitle />

				<div className="flex gap-8">
					<div className="flex w-[700px] flex-col gap-8">
						<PaymentMethod />
						<PaymentDetail paymentList={paymentList} />
					</div>
					<PaymentOrder />
				</div>
			</div>
		</form>
	)
}
