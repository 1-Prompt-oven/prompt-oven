import type { PaymentItemType } from "@/types/purchase.ts/purchase-ongoing"
import PaymentDetailLine from "../atom/PaymentDetailLine"

interface PaymentListProps {
	paymentList: PaymentItemType[]
}

export default function PaymentList({ paymentList }: PaymentListProps) {
	return (
		<ul className="flex flex-col gap-4">
			{paymentList.length > 0
				? paymentList.map((item) => (
						<li key={item.productUUID}>
							<PaymentDetailLine
								name={item.productName}
								price={item.productPrice}
							/>
						</li>
					))
				: null}
		</ul>
	)
}
