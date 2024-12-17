import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import StarAnimation from "@repo/ui/star-animation"
import { getCheckToday, ReviewDateFormatted } from "@/lib/utils"
import { STATIC_DEFAULT_AVATAR } from "@/app/static/data"
import type { ReviewContentType } from "@/types/review/reviewType"
import PromptDetailReviewLine from "../../atoms/review/PromptDetailReviewLine"

interface PromptDetailReviewContentModalProps {
	content: ReviewContentType
	memberUuid: string | null
}

export default function PromptDetailReviewContentModal({
	content,
	memberUuid,
}: PromptDetailReviewContentModalProps) {
	const isNotToday = getCheckToday(content.updatedAt)
	const formDate = ReviewDateFormatted(content.updatedAt)
	const profileImage = content.authorProfileImage || STATIC_DEFAULT_AVATAR

	return (
		<li className="rounded-md bg-[#1b1b1b]">
			<div className="min-h-[150px]">
				<div
					className={`${memberUuid === content.authorUuid ? "w-[80%] xs:w-[85%] lg:w-[92%]" : "w-[94%]"} flex items-end justify-between`}>
					<Link
						href={`/profile/seller/${content.authorNickname}`}
						className="ml-5 mt-3 flex w-full items-center justify-between gap-4 lg:!mt-4 lg:ml-10">
						<div className="flex items-center gap-2">
							<Avatar className="h-6 w-6 lg:h-8 lg:w-8">
								<AvatarImage src={profileImage} alt={content.authorNickname} />
								<AvatarFallback>AU</AvatarFallback>
							</Avatar>
							<p className="mt-1 text-xs font-bold text-white xs:!text-lg">
								{content.authorNickname}
							</p>
						</div>

						<div className="mx-2">
							<p className="mt-2 flex items-center justify-end gap-4 text-xs text-[#848898] lg:mx-6 lg:mt-3 lg:text-sm">
								<span>{isNotToday !== null ? isNotToday : ""}</span>
								<span>{formDate}</span>
							</p>
							<div className="flex justify-end">
								<StarAnimation
									rateData={content.star}
									noAnimation={false}
									className="inline-block xs:!hidden"
								/>
							</div>
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
					content={content}
					memberUuid={memberUuid}
				/>
			</div>
		</li>
	)
}
