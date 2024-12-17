"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import StarAnimation from "@repo/ui/star-animation"
import type {
	ProfileDetailSellorShortType,
	PromptDetailInfoType,
} from "@/types/prompt-detail/promptDetailType"
import type { PromptSimpleReviewData } from "@/types/review/reviewType"
import { STATIC_DEFAULT_AVATAR } from "@/app/static/data"

interface PromptDetailHoverMouseProps {
	sellerInfo: ProfileDetailSellorShortType
	productDetail: PromptDetailInfoType
	reviewSimpleData: PromptSimpleReviewData
}

export default function PromptDetailHoverMouse({
	sellerInfo,
	productDetail,
	reviewSimpleData,
}: PromptDetailHoverMouseProps) {
	const [isHovered, setIsHovered] = useState(false)

	const profileImage =
		sellerInfo.memberProfileImage !== ""
			? sellerInfo.memberProfileImage
			: STATIC_DEFAULT_AVATAR

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<Avatar className="h-5 w-5">
				<AvatarImage src={profileImage} alt={sellerInfo.memberNickname} />
				<AvatarFallback>AU</AvatarFallback>
			</Avatar>

			{isHovered ? (
				<div
					className="absolute z-30 min-w-[500px] rounded bg-[#181318] p-4 shadow-lg"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<div className="flex items-center justify-start gap-6">
						<div className="rounded-md bg-white">
							<Image
								src={productDetail.contents[0].contentUrl}
								width={160}
								height={160}
								alt={productDetail.productName}
								className="rounded-md"
								priority
							/>
						</div>

						<div className="flex flex-col items-start justify-between gap-4">
							<div className="flex flex-col gap-1">
								<p className="line-clamp-1 text-xl">
									<span className="text-start">
										{productDetail.productName}
									</span>
								</p>
								<div className="flex items-center gap-4">
									<StarAnimation
										rateData={reviewSimpleData.avgStar}
										noAnimation={false}
									/>
									<span className="mt-1 text-xs font-semibold">
										( {reviewSimpleData.reviewCount} )
									</span>
								</div>
								<p className="flex items-start">
									<span className="mr-1 text-sm">$</span>
									<span className="text-base">{productDetail.price}</span>
								</p>
							</div>

							<div className="flex items-center gap-2">
								<Link
									href={`/profile/seller/${sellerInfo.memberNickname}`}
									className="flex items-center gap-2">
									<Avatar className="h-6 w-6">
										<AvatarImage
											src={profileImage}
											alt={sellerInfo.memberNickname}
										/>
										<AvatarFallback>AU</AvatarFallback>
									</Avatar>
									<p className="mt-1 text-base font-bold">
										{sellerInfo.memberNickname}
									</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
