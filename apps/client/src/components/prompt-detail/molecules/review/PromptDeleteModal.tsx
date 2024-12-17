"use client"

import { useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui/dialog"
import { deleteReviewAction } from "@/action/prompt-detail/getProductDetailReviewData"
import type { ReviewContentType } from "@/types/review/reviewType"

interface PromptDeleteModalProps {
	reviewId: string
	content: ReviewContentType
}

export default function PromptDeleteModal({
	reviewId,
	content,
}: PromptDeleteModalProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const reviewHandler = async () => {
		const res = await deleteReviewAction(reviewId)

		if (res) setIsOpen(!isOpen)
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				setIsOpen(!isOpen)
			}}>
			<DialogTrigger asChild>
				<button
					type="button"
					className="flex rounded-md bg-none px-4 text-xs font-semibold text-[#a8a8a8]">
					<span>삭</span>
					<span>제</span>
				</button>
			</DialogTrigger>
			<DialogContent className="gradient-filter flex h-[350px] w-[300px] flex-col gap-2 rounded border-none xs:w-[600px]">
				<DialogHeader>
					<DialogTitle className="font-bold text-white" />
					<DialogDescription className="font-bold text-white" />
					<div className="flex cursor-pointer select-none flex-col items-center justify-center text-sm font-bold text-[#C1C1C1] shadow-lg transition-shadow duration-200 hover:shadow-xl">
						리뷰 삭제
					</div>
				</DialogHeader>

				<div className="min-h-[200px] rounded-md border border-[#C1C1C1] p-2 text-white">
					<span>{content.contents}</span>
				</div>

				<div className="flex justify-between">
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-orange-300 via-orange-500 to-orange-600 p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-orange-400 hover:via-orange-500 hover:to-orange-600">
						<span className="font-semibold">취소</span>
					</button>

					<button
						type="button"
						onClick={reviewHandler}
						className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-transparent via-black/5 to-black p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-black/10 hover:via-black/20 hover:to-black">
						<span className="font-semibold text-white">삭제하기</span>
					</button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
