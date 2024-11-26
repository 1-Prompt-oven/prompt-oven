import PurchaseIngTitle from "../atom/PurchaseIngTitle"
import PaymentDetail from "../organism/PaymentDetail"
import PaymentMethod from "../organism/PaymentMethod"
import PaymentOrder from "../organism/PaymentOrder"

export default function PurchaseIngTemplate() {
	return (
		<div className="mx-6 mt-4 max-w-screen-xl">
			<PurchaseIngTitle />

			<div className="flex gap-8">
				<div className="flex w-[700px] flex-col gap-8">
					<PaymentMethod />
					<PaymentDetail />
				</div>
				<PaymentOrder />
			</div>
		</div>
	)
}
