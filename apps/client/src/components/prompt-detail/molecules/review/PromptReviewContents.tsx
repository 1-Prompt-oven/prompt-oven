import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import type { PromptReviewType } from "@/types/review/reviewType"
import PromptDetailNoReview from "../../atoms/review/PromptDetailNoReview"
import PromptDetailReviewContent from "./PromptDetailReviewContent"

interface PromptReviewContentsProps {
	productDetail: PromptDetailInfoType
	productReview: PromptReviewType
}

export default function PromptReviewContents({
	productDetail,
	productReview,
}: PromptReviewContentsProps) {
	// eslint-disable-next-line no-console -- This is a client-side only log
	console.log(productDetail)
	return (
		<div>
			{productReview.content.length > 0 ? (
				<div>
					<ul className="mr-6 grid grid-cols-1 gap-4">
						{productReview.content.slice(0, 2).map((review) => (
							<PromptDetailReviewContent
								key={review.id}
								memberNickname={review.memberNickname}
								memberProfileImage={review.memberProfileImage}
								updatedAt={review.updatedAt}
								content={review.content}
							/>
						))}
					</ul>
					{/* <PromptDetailReviewMore
						productDetail={productDetail}
						productReview={productReview}
					/> */}
				</div>
			) : (
				<PromptDetailNoReview />
			)}
		</div>
	)
}
