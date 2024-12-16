"use client"

import { useState } from "react"
import { Textarea } from "@repo/ui/textarea"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui/dialog"
import ReviewStar from "@repo/ui/review-star"
import { writeReviewAction } from "@/action/prompt-detail/getProductDetailReviewData"
import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"

interface PromptWriteModalProps {
	productDetail: PromptDetailInfoType
}

export default function PromptWriteModal({
	productDetail,
}: PromptWriteModalProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const [contents, setContents] = useState<string>("")
	const [star, setStar] = useState<number>(0)

	const handleTextChange = (value: string) => {
		setContents(value)
	}

	const reviewHandler = async () => {
		const res = await writeReviewAction(productDetail, contents, Number(star))

		if (res) setIsOpen(!isOpen)
	}

	return (
		<div className="my-5">
			<Dialog
				open={isOpen}
				onOpenChange={() => {
					setIsOpen(!isOpen)
				}}>
				<DialogTrigger asChild>
					<button
						type="button"
						className="rounded-md bg-none px-4 text-xs font-semibold text-[#a8a8a8]">
						<span>리뷰 작성</span>
					</button>
				</DialogTrigger>
				<DialogContent className="gradient-filter flex h-[350px] w-[300px] flex-col gap-2 rounded border-none xs:w-[600px]">
					<DialogHeader>
						<DialogTitle className="font-bold text-white" />
						<DialogDescription className="font-bold text-white" />
						<div className="flex cursor-pointer select-none flex-col items-center justify-center text-sm font-bold text-[#C1C1C1] shadow-lg transition-shadow duration-200 hover:shadow-xl">
							리뷰 작성
						</div>
					</DialogHeader>
					<Textarea
						value={contents}
						placeholder="리뷰를 작성해주세요"
						className="h-[200px] bg-gradient-filter p-2 text-left leading-tight text-white"
						onChange={(e) => handleTextChange(e.target.value)}
					/>

					<div className="flex justify-between">
						<div className="flex items-center gap-1 text-[9px]">
							<div className="text-xs font-semibold text-white">평점 : </div>
							<ReviewStar
								star={star}
								setStar={setStar}
								noAnimation={false}
								className="hidden xs:!inline-block"
							/>
						</div>
						<button type="button" onClick={() => setContents("")}>
							<span className="text-xs text-[#a8a8a8]">초기화</span>
						</button>
					</div>

					<div className="flex justify-between">
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-orange-300 via-orange-500 to-orange-600 p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-orange-400 hover:via-orange-500 hover:to-orange-600">
							<span className="font-semibold">확인</span>
						</button>

						<button
							type="button"
							onClick={reviewHandler}
							className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-transparent via-black/5 to-black p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-black/10 hover:via-black/20 hover:to-black">
							<span className="font-semibold text-white">작성하기</span>
						</button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
