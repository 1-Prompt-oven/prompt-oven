import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import type { PromptReviewType } from "@/types/review/reviewType"
import PromptReviewContents from "../molecules/review/PromptReviewContents"

interface PromptDetailReviewProps {
	productDetail: PromptDetailInfoType
	productReview: PromptReviewType
}

export default function PromptDetailReview({
	productDetail,
	productReview,
}: PromptDetailReviewProps) {
	return (
		<div className="mx-auto mt-12 flex w-full flex-col gap-8 text-white lg:mt-0">
			<p className="text-2xl font-semibold xs:!text-4xl">Prompt reviews</p>
			<PromptReviewContents
				productDetail={productDetail}
				productReview={productReview}
			/>
		</div>
	)
}
