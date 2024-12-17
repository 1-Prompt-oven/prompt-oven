"use client"

import React, { useState } from "react"
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@repo/ui/lucide"
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
	const [isExpanded, setIsExpanded] = useState<boolean>(false)

	const toggleReview = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className="mb-4 mt-4 flex gap-2 pl-4 lg:gap-4 lg:pl-20">
			<div className="flex w-[94%] items-center overflow-hidden rounded-lg bg-[#181318]">
				<p
					className={`m-3 text-[16px] font-semibold transition-all duration-500 ease-in-out ${
						isExpanded
							? "]max-h-[400px] min-h-[50px]"
							: "line-clamp-2 min-h-[50px] lg:max-h-16"
					}`}>
					<span>{content.contents}</span>
				</p>
			</div>
			<div className="mr-2 flex flex-col justify-center gap-4">
				<div className="flex items-center justify-center">
					{isExpanded ? (
						<ArrowUpCircleIcon
							className="cursor-pointer text-white"
							onClick={toggleReview}
						/>
					) : (
						<ArrowDownCircleIcon
							className="cursor-pointer text-white"
							onClick={toggleReview}
						/>
					)}
				</div>
				{memberUuid && memberUuid === content.authorUuid ? (
					<div className="flex flex-col items-center justify-center gap-2">
						<PromptModifyModal reviewId={reviewId} content={content} />
						<PromptDeleteModal reviewId={reviewId} content={content} />
					</div>
				) : null}
			</div>
		</div>
	)
}
