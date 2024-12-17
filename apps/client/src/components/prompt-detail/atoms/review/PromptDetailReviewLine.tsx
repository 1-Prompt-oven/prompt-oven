"use client"

import React, { useState } from "react"
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@repo/ui/lucide"
import { deleteReviewAction } from "@/action/prompt-detail/getProductDetailReviewData"

interface ReviewLineProps {
	reviewId: string
	content: string
}

export default function PromptDetailReviewLine({
	reviewId,
	content,
}: ReviewLineProps) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const toggleReview = () => {
		setIsExpanded(!isExpanded)
	}

	const deleteReviewHandler = async () => {
		const res = await deleteReviewAction(reviewId)
		if (res) setIsOpen(!isOpen)
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
					<span>{content}</span>
				</p>
			</div>
			<div className="mr-2 flex flex-col justify-center gap-2">
				<div>
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
				<div className="flex flex-col gap-1 text-[9px] text-white">
					<button type="button">
						<span>수정</span>
					</button>
					<button type="button" onClick={deleteReviewHandler}>
						<span>삭제</span>
					</button>
				</div>
			</div>
		</div>
	)
}
