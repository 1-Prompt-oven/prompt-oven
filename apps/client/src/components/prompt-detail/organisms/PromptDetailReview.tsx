import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import type { PromptReviewType } from "@/types/review/reviewType"
import PromptReviewContents from "../molecules/review/PromptReviewContents"
import PromptWriteModal from "../molecules/review/PromptWriteModal"

interface PromptDetailReviewProps {
	productDetail: PromptDetailInfoType
	productReview: PromptReviewType
	purchaseState: boolean
}

export default async function PromptDetailReview({
	productDetail,
	productReview,
	purchaseState,
}: PromptDetailReviewProps) {
	return (
		<div className="mx-auto mb-12 mt-12 flex w-full flex-col gap-4 text-white lg:mb-2 lg:mt-0">
			<div className="flex items-center justify-between">
				<p className="text-2xl font-semibold xs:!text-4xl">Prompt reviews</p>
				{purchaseState ? (
					<PromptWriteModal productDetail={productDetail} />
				) : null}
			</div>

			<PromptReviewContents
				productDetail={productDetail}
				productReview={productReview}
			/>
		</div>
	)
}
