import { getPurchaseEd } from "@/action/purchase/purchase-ed"
import PurchaseEdTemplate from "@/components/purchase-ed/template/PurchaseEdTemplate"

export default async function PurchaseEd() {
	const purchaseEdData = await getPurchaseEd()

	return (
		<section className="container mx-auto min-h-[650px] bg-[#111111] py-1">
			<PurchaseEdTemplate purchaseEdData={purchaseEdData} />
		</section>
	)
}
