"use client"

import React, { useState } from "react"
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@repo/ui/lucide"

interface ReviewLineProps {
	content: string
}

export default function PromptDetailReviewLine({ content }: ReviewLineProps) {
	const [isExpanded, setIsExpanded] = useState(false)

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
					<span>{content}</span>
				</p>
			</div>
			<div className="mr-2 flex justify-center">
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
		</div>
	)
}
