import type { PromptsType } from "@/types/prompts/promptsType"
import PurchaseEdContainer from "../organism/PurchaseEdContainer"
import PurchaseEdTitle from "../atom/PurchaseEdTitle"

interface PurchaseEdTemplateProps {
	purchaseEdList: PromptsType[]
}

export default function PurchaseEdTemplate({
	purchaseEdList,
}: PurchaseEdTemplateProps) {
	return (
		<div className="mx-auto mt-4 max-w-screen-xl">
			<PurchaseEdTitle />
			<PurchaseEdContainer purchaseEdList={purchaseEdList} />
		</div>
	)
}

