import { getCookieLatest } from "@/action/cookie/cookieAction"
import {
	getDetailCategory,
	getDetailDrops,
} from "@/action/prompt-detail/getAssociationProduct"
import {
	getProductDetail,
	getPurchaseState,
} from "@/action/prompt-detail/getProductDetailData"
import { getProductReview } from "@/action/prompt-detail/getProductDetailReviewData"
import PromptDetailTemplate from "@/components/prompt-detail/templates/PromptDetailTemplate"

interface PromptIdProps {
	params: {
		id: string
	}
}

export default async function PromptDetail({ params }: PromptIdProps) {
	const productId = params.id

	const productDetail = await getProductDetail(productId)
	const productReview = await getProductReview(productId)
	const userCookie = await getCookieLatest()
	const purchaseState = await getPurchaseState(productId)
	const notableDrops = await getDetailDrops()
	const categories = await getDetailCategory()

	return (
		<main className="container mx-auto bg-[#111111] py-1">
			<PromptDetailTemplate
				productDetail={productDetail}
				productReview={productReview}
				userCookie={userCookie}
				purchaseState={purchaseState}
				notableDrops={notableDrops}
				categories={categories}
			/>
		</main>
	)
}
