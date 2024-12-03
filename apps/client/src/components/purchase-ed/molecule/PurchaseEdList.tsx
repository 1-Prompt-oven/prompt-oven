import type { PromptsType } from "@/types/prompts/promptsType"
import PromptCardAccount from "@/components/common/organism/PromptCardAccount"

interface PurchaseEdListProps {
	purchaseEdList: PromptsType[]
}

export default function PurchaseEdList({
	purchaseEdList,
}: PurchaseEdListProps) {
	return (
		<div className="mx-auto">
			<ul className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{purchaseEdList.length > 0
					? purchaseEdList.map((item) => (
							<PromptCardAccount productInfo={item} key={item.productUuid} />
						))
					: null}
			</ul>
		</div>
	)
}

