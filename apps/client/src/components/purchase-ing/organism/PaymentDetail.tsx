import type { PaymentItemType } from "@/types/purchase.ts/purchase-ongoing"
import PaymentDetailLine from "../atom/PaymentDetailLine"
import PaymentDetailTotalItem from "../atom/PaymentDetailTotalItem"
import PaymentDivider from "../atom/PaymentDivider"
import PaymentTitle from "../atom/PaymentTitle"
import PromptDetailTotalPrice from "../atom/PromptDetailTotalPrice"
import PaymentList from "../molecule/PaymentList"

interface PaymentDetailProps {
	paymentList: PaymentItemType[]
	totalPrice: number
}

export default function PaymentDetail({
	paymentList,
	totalPrice,
}: PaymentDetailProps) {
	return (
		<div className="rounded-md bg-white font-semibold">
			<PaymentTitle title="Payment Details" option="p-4" />
			<PaymentDivider />

			{paymentList.length > 0 ? (
				<>
					<div className="flex flex-col gap-4 p-4 text-sm font-semibold">
						<p className="text-sm">Item List</p>
						<PaymentList paymentList={paymentList} />

						<PaymentDetailLine name="Discount" price="0" />
						<PaymentDetailTotalItem count={paymentList.length} />
					</div>

					<div className="px-4">
						<PaymentDivider />
						<PromptDetailTotalPrice name="Total Payment" price={totalPrice} />
					</div>
				</>
			) : (
				<div className="m-auto">
					<p className="p-4">구매 진행중인 상품이 없습니다.</p>
				</div>
			)}
		</div>
	)
}
