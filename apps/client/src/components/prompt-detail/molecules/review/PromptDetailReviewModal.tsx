import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import { getCheckToday, ReviewDateFormatted } from "@/lib/utils"
import { STATIC_DEFAULT_AVATAR } from "@/app/static/data"
import type { ReviewContentType } from "@/types/review/reviewType"
import PromptDetailReviewModalLine from "../../atoms/PromptDetailReviewModalLine"

interface PromptDetailReviewModalProps {
	review: ReviewContentType
}

export default function PromptDetailReviewModal({
	review,
}: PromptDetailReviewModalProps) {
	const isNotToday = getCheckToday(review.updatedAt)
	const formDate = ReviewDateFormatted(review.updatedAt)
	const profileImage = review.authorProfileImage || STATIC_DEFAULT_AVATAR

	return (
		<li className="rounded-md bg-[#1b1b1b] text-white">
			<div className="min-h-[100px]">
				<Link
					href={`/profile/${review.authorNickname}`}
					className="ml-3 mt-1 flex items-center gap-4 lg:ml-6 lg:mt-2">
					<Avatar className="h-4 w-4 lg:h-6 lg:w-6">
						<AvatarImage src={profileImage} alt={review.authorNickname} />
						<AvatarFallback>AU</AvatarFallback>
					</Avatar>
					<p className="mt-1 text-sm font-bold lg:text-lg">
						{review.authorNickname}
					</p>
					<p className="mx-3 mt-1 flex gap-4 text-xs text-[#848898] lg:mx-6">
						<span>{isNotToday !== null ? isNotToday : ""}</span>
						<span>{formDate}</span>
					</p>
				</Link>
				<PromptDetailReviewModalLine content={review.contents} />
			</div>
		</li>
	)
}
