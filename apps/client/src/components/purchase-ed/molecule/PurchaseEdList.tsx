import PromptCard from "@/components/common/organism/PromptCard"
import type { PromptItemType } from "@/types/prompts/promptsType"

interface PurchaseEdListProps {
	purchaseEdList: PromptItemType[]
}

export default function PurchaseEdList({
	purchaseEdList,
}: PurchaseEdListProps) {
	return (
		<div className="mx-auto">
			<ul className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{purchaseEdList.length > 0
					? purchaseEdList.map((item) => (
							<PromptCard productInfo={item} key={item.productUuid} />
						))
					: null}
			</ul>
		</div>
	)
}
