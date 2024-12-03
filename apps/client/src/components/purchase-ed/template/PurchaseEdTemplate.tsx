import type { PromptItemType } from "@/types/prompts/promptsType"
import PurchaseEdTitle from "../atom/PurchaseEdTitle"
import PurchaseEdContainer from "../organism/PurchaseEdContainer"

interface PurchaseEdTemplateProps {
	purchaseEdList: PromptItemType[]
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
