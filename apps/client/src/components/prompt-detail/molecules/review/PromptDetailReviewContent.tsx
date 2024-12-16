import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import StarAnimation from "@repo/ui/star-animation"
import { getCheckToday, ReviewDateFormatted } from "@/lib/utils"
import { STATIC_DEFAULT_AVATAR } from "@/app/static/data"
import type { ReviewContentType } from "@/types/review/reviewType"
import PromptDetailReviewLine from "../../atoms/review/PromptDetailReviewLine"

interface PromptDetailReviewContentProps {
	content: ReviewContentType
}

export default function PromptDetailReviewContent({
	content,
}: PromptDetailReviewContentProps) {
	const isNotToday = getCheckToday(content.updatedAt)
	const formDate = ReviewDateFormatted(content.updatedAt)
	const profileImage = content.authorProfileImage || STATIC_DEFAULT_AVATAR

	return (
		<li className="rounded-md bg-[#1b1b1b]">
			<div className="min-h-[150px]">
				<div className="flex w-[94%] items-end justify-between">
					<Link
						href={`/profile/seller/${content.authorNickname}`}
						className="ml-5 mt-3 flex items-center gap-4 lg:!mt-4 lg:ml-10">
						<Avatar className="h-6 w-6 lg:h-8 lg:w-8">
							<AvatarImage src={profileImage} alt={content.authorNickname} />
							<AvatarFallback>AU</AvatarFallback>
						</Avatar>
						<p className="mt-1 text-base font-bold lg:text-xl">
							{content.authorNickname}
						</p>

						<div className="mx-3">
							<p className="mt-2 flex gap-4 text-xs text-[#848898] lg:mx-6 lg:mt-3 lg:text-sm">
								<span>{isNotToday !== null ? isNotToday : ""}</span>
								<span>{formDate}</span>
							</p>
							<StarAnimation
								rateData={content.star}
								noAnimation={false}
								className="inline-block xs:!hidden"
							/>
						</div>
					</Link>

					<StarAnimation
						rateData={content.star}
						noAnimation={false}
						className="hidden xs:!inline-block"
					/>
				</div>

				<PromptDetailReviewLine
					reviewId={content.id}
					content={content.contents}
				/>
			</div>
		</li>
	)
}
