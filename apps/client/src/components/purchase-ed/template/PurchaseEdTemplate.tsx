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
		<section className="mx-auto mt-12 max-w-screen-xl">
			<PurchaseEdTitle />
			<PurchaseEdContainer purchaseEdList={purchaseEdList} />
		</section>
	)
}
