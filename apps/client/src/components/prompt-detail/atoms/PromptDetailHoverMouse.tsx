"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import StarAnimation from "@repo/ui/star-animation"
import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"

interface PromptDetailHoverMouseProps {
	productDetail: PromptDetailInfoType
}

export default function PromptDetailHoverMouse({
	productDetail,
}: PromptDetailHoverMouseProps) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<Avatar className="h-5 w-5">
				<AvatarImage
					src={productDetail.thumbnailUrl}
					alt={productDetail.productName}
				/>
				<AvatarFallback>AU</AvatarFallback>
			</Avatar>

			{isHovered ? (
				<div className="absolute z-10 mt-2 w-[400px] rounded bg-[#181318] p-4 shadow-lg md:w-[500px]">
					<div className="flex items-center justify-center gap-4">
						<Image
							src={productDetail.thumbnailUrl}
							width={100}
							height={100}
							alt={productDetail.productName}
							priority
						/>
						<div className="flex flex-col items-start justify-between gap-4">
							<div className="flex flex-col gap-1">
								<p className="line-clamp-1 text-xl">
									<span className="text-start">
										{productDetail.productName}
									</span>
								</p>
								<div className="flex items-center gap-4">
									<StarAnimation
										rateData={productDetail.avgStar}
										noAnimation={false}
									/>
									<span className="mt-1 text-xs font-semibold">
										( {productDetail.productReviewCount} )
									</span>
								</div>
								<p className="flex items-start">
									<span className="mr-1 text-sm">$</span>
									<span className="text-base">{productDetail.price}</span>
								</p>
							</div>

							<div className="flex items-center gap-2">
								<Link
									href={`/profile/${productDetail.memberNickname}`}
									className="flex items-center gap-2">
									<Avatar className="h-6 w-6">
										<AvatarImage
											src={productDetail.memberProfileImage}
											alt={productDetail.memberNickname}
										/>
										<AvatarFallback>AU</AvatarFallback>
									</Avatar>
									<p className="mt-1 text-base font-bold">
										{productDetail.memberNickname}
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
