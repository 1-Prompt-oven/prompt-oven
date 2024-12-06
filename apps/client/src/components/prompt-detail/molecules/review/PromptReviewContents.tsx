import { getReviewSimpleData } from "@/action/prompt-detail/getProductDetailReviewData"
import { getSellorShort } from "@/action/prompt-detail/getProductDetailData"
import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import type { PromptReviewType } from "@/types/review/reviewType"
import PromptDetailNoReview from "../../atoms/review/PromptDetailNoReview"
import PromptDetailReviewContent from "./PromptDetailReviewContent"
import PromptDetailReviewMore from "./PromptDetailReviewMore"

interface PromptReviewContentsProps {
	productDetail: PromptDetailInfoType
	productReview: PromptReviewType
}

export default async function PromptReviewContents({
	productDetail,
	productReview,
}: PromptReviewContentsProps) {
	const reviewSimpleData = await getReviewSimpleData(productDetail.productUuid)
	const sellorInfo = await getSellorShort(productDetail.sellerUuid)

	return (
		<div>
			{productReview.content.length > 0 ? (
				<div>
					<ul className="mr-6 grid grid-cols-1 gap-4">
						{productReview.content.slice(0, 2).map((content) => (
							<PromptDetailReviewContent key={content.id} content={content} />
						))}
					</ul>
					<PromptDetailReviewMore
						reviewSimpleData={reviewSimpleData}
						sellorInfo={sellorInfo}
						productDetail={productDetail}
						productReview={productReview}
					/>
				</div>
			) : (
				<PromptDetailNoReview />
			)}
		</div>
	)
}
