import type { PromptPurchaseAllInfoProps } from "@/types/purchase.ts/purchase-ongoing"
import PurchaseEdInfo from "../atom/PurchaseEdInfo"

interface PurchaseEdListProps {
	purchaseEdList: PromptPurchaseAllInfoProps[]
}

export default function PurchaseEdList({
	purchaseEdList,
}: PurchaseEdListProps) {
	return (
		<div className="mx-auto w-full">
			{purchaseEdList.length > 0 ? (
				<ul className="flex flex-col gap-6">
					{purchaseEdList.map((item) => (
						<PurchaseEdInfo item={item} key={item.purchaseUuid} />
					))}
				</ul>
			) : (
				<div className="flex h-[400px] items-center justify-center p-4">
					<span className="text-[#969696]">구매한 프롬프트가 없습니다..</span>
				</div>
			)}
		</div>
	)
}
