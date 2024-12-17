import type { ReviewContentType } from "@/types/review/reviewType"
import PromptModifyModal from "../../molecules/review/PromptModifyModal"
import PromptDeleteModal from "../../molecules/review/PromptDeleteModal"

interface ReviewLineProps {
	reviewId: string
	content: ReviewContentType
	memberUuid: string | null
}

export default function PromptDetailReviewLine({
	reviewId,
	content,
	memberUuid,
}: ReviewLineProps) {
	return (
		<div className="mb-4 mt-4 flex gap-2 pl-4 lg:gap-4 lg:pl-16">
			<div className="flex w-[94%] items-center overflow-hidden rounded-lg bg-[#181318]">
				<p className="m-3 min-h-[50px] text-[16px] font-semibold text-white transition-all duration-500 ease-in-out lg:max-h-16">
					<span>{content.contents}</span>
				</p>
			</div>
			<div className="mr-2 flex flex-col justify-center gap-4">
				{memberUuid && memberUuid === content.authorUuid ? (
					<div className="flex flex-col items-center justify-center gap-5">
						<PromptModifyModal reviewId={reviewId} content={content} />
						<PromptDeleteModal reviewId={reviewId} content={content} />
					</div>
				) : null}
			</div>
		</div>
	)
}
