import type { PromptPurchaseFinalInfoProps } from "@/types/purchase.ts/purchase-ongoing"
import PurchaseEdContainer from "../organism/PurchaseEdContainer"

interface PurchaseEdTemplateProps {
	purchaseEdData: PromptPurchaseFinalInfoProps
}

export default function PurchaseEdTemplate({
	purchaseEdData,
}: PurchaseEdTemplateProps) {
	return (
		<div className="mx-auto mt-4 min-h-[650px] max-w-screen-xl">
			{/* <PurchaseEdTitle /> */}
			<PurchaseEdContainer purchaseEdData={purchaseEdData} />
		</div>
	)
}
