import type { PromptsType } from "@/types/prompts/promptsType"
import PurchaseEdCountBar from "../molecule/PurchaseEdCountBar"
import PurchaseEdList from "../molecule/PurchaseEdList"

interface PurchaseEdContainerProps {
	purchaseEdList: PromptsType[]
}

export default function PurchaseEdContainer({
	purchaseEdList,
}: PurchaseEdContainerProps) {
	return (
		<div className="flex flex-col gap-8">
			<PurchaseEdCountBar purchaseCount={purchaseEdList.length} />
			<div className="mx-auto mb-16 flex flex-col gap-8 md:!flex-row">
				<PurchaseEdList purchaseEdList={purchaseEdList} />
			</div>
		</div>
	)
}
