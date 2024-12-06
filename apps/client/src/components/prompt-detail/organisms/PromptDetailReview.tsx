import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import type { PromptReviewType } from "@/types/review/reviewType"
import PromptDetailReviewCount from "../atoms/review/PromptDetailReviewCount"
import PromptReviewContents from "../molecules/review/PromptReviewContents"

interface PromptDetailReviewProps {
	reviewCount: number
	productDetail: PromptDetailInfoType
	productReview: PromptReviewType
}

export default function PromptDetailReview({
	reviewCount,
	productDetail,
	productReview,
}: PromptDetailReviewProps) {
	return (
		<div className="mx-auto mt-12 flex flex-col gap-8 text-white lg:mt-0">
			<PromptDetailReviewCount reviewCount={reviewCount} />
			<PromptReviewContents
				productDetail={productDetail}
				productReview={productReview}
			/>
		</div>
	)
}
