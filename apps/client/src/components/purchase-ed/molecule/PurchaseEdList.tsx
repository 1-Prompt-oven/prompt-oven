import type { PromptsType } from "@/types/prompts/promptsType"
import FavoriteItem from "../atom/PurchaseEdItem"

interface PurchaseEdListProps {
	purchaseEdList: PromptsType[]
}

export default function PurchaseEdList({
	purchaseEdList,
}: PurchaseEdListProps) {
	return (
		<div className="mx-auto">
			<ul className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{purchaseEdList.length > 0
					? purchaseEdList.map((item) => (
							<FavoriteItem productInfo={item} key={item.productUUID} />
						))
					: null}
			</ul>
		</div>
	)
}
