import { PromptCardDateFormatted, ReviewDateFormatted } from "@/lib/utils"
import type { PromptPurchaseAllInfoProps } from "@/types/purchase.ts/purchase-ongoing"

interface PurchaseEdInfoProps {
	item: PromptPurchaseAllInfoProps
}

//hover:scale-105

export default function PurchaseEdInfo({ item }: PurchaseEdInfoProps) {
	return (
		<li
			key={item.purchaseUuid}
			className="flex flex-col items-center rounded-lg border border-[#666666] bg-gradient-filter text-white">
			<div className="flex w-full items-center justify-between gap-2 border-b border-b-[#666666]">
				<p className="p-4 text-[10px] font-semibold sm:text-sm">
					{item.shortData.orderName}
				</p>
				<p className="mr-2 flex min-w-[60px] flex-col items-center justify-end text-[9px] sm:gap-2 sm:p-4 sm:text-[10px]">
					<span>{PromptCardDateFormatted(item.purchaseDate)}</span>
					<span>{ReviewDateFormatted(item.purchaseDate)}</span>
				</p>
			</div>
			<div className="flex w-full flex-col items-center justify-between sm:!flex-row">
				<div className="flex w-full flex-grow flex-col gap-3 border-b border-b-[#666666] p-4 text-[10px] sm:!border-b-0 sm:border-r sm:border-r-[#666666] sm:text-sm">
					<p className="flex flex-col gap-1 sm:!flex-row sm:gap-3">
						<span>주문번호</span>
						<span className="font-semibold">{item.purchaseUuid}</span>
					</p>
					<p className="flex gap-3">
						<span>결제 수단</span>
						<span className="font-semibold">
							{item.shortData.paymentMethod}
						</span>
					</p>
					<p className="flex gap-3">
						<span>결제 방식</span>
						<span className="font-semibold">{item.shortData.paymentWay}</span>
					</p>
					<p className="flex flex-col gap-1 sm:!flex-row sm:gap-3">
						<span>요청 사항</span>
						<span
							className="flex-grow overflow-hidden whitespace-normal break-words font-semibold sm:whitespace-nowrap"
							style={{
								wordBreak: "break-word", // 단어를 넘치지 않도록 자름
								minWidth: 0, // Flexbox 환경에서 자식 요소가 영역을 침범하지 않도록 설정
							}}>
							{item.shortData.message}
						</span>
					</p>
				</div>
				<div className="flex w-full items-center justify-between gap-4 px-4 py-2 sm:max-w-[100px] sm:flex-col sm:justify-center">
					<p className="flex flex-row items-center justify-center gap-2 sm:!flex-col sm:!gap-0">
						<span className="text-xs sm:text-[10px]">총 결제 금액</span>
						<span className="text-xs">{item.shortData.totalAmount}원</span>
					</p>
					<p className="text-center text-xs font-semibold sm:text-sm">
						{item.status === "COMPLETED" ? "결제 완료" : "결제 취소"}
					</p>
				</div>
			</div>
		</li>
	)
}
