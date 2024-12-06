"use client"

import { useEffect, useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui/dialog"
import { Button } from "@repo/ui/button"
import { getProductReview } from "@/action/prompt-detail/getProductDetailReviewData"
import type {
	ProfileDetailSellorShortType,
	PromptDetailInfoType,
} from "@/types/prompt-detail/promptDetailType"
import type {
	PromptReviewType,
	PromptSimpleReviewData,
} from "@/types/review/reviewType"
import PromptDetailHoverMouse from "../../atoms/PromptDetailHoverMouse"
import PromptDetailReviewModal from "./PromptDetailReviewModal"

interface PromptDetailReviewMoreProps {
	reviewSimpleData: PromptSimpleReviewData
	sellorInfo: ProfileDetailSellorShortType
	productDetail: PromptDetailInfoType
	productReview: PromptReviewType
}

export default function PromptDetailReviewMore({
	reviewSimpleData,
	sellorInfo,
	productDetail,
	productReview,
}: PromptDetailReviewMoreProps) {
	const [reviewList, setReviewList] = useState<PromptReviewType>(productReview)
	const [hasNext, setHasNext] = useState<boolean>(productReview.hasNext)
	const [page, setPage] = useState<number>(productReview.page)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const moreReviewHandler = async () => {
		if (!hasNext) return

		const newReviews = await getProductReview(
			productDetail.productUuid,
			page + 1,
		)
		setReviewList((prev) => ({
			...prev,
			content: [...prev.content, ...newReviews.content],
		}))
		setHasNext(newReviews.hasNext)
		setPage((prev) => prev + 1)
	}

	useEffect(() => {
		if (!isOpen) {
			setReviewList(productReview)
			setHasNext(productReview.hasNext)
			setPage(productReview.page)
		}
	}, [isOpen])

	return (
		<div className="mx-auto my-5 flex justify-center">
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger>
					<div
						role="button"
						className="rounded-full bg-[#424040] px-4 py-1 text-white hover:bg-[#2e2d2d]">
						View Modal
					</div>
				</DialogTrigger>
				<DialogContent className="h-[600px] min-w-[400px] max-w-[500px] rounded border-none bg-[#252525] lg:h-[700px] lg:min-w-[600px] lg:max-w-[900px]">
					<DialogHeader className="mb-4 ml-4 flex flex-row items-center gap-4 lg:mb-0">
						<DialogTitle className="font-bold text-white">
							<PromptDetailHoverMouse
								sellorInfo={sellorInfo}
								productDetail={productDetail}
								reviewSimpleData={reviewSimpleData}
							/>
						</DialogTitle>

						<DialogDescription className="!mt-0 text-sm text-[#C1C1C1]">
							<span>All Reviews</span>
						</DialogDescription>
					</DialogHeader>
					<ul className="grid max-h-[550px] grid-cols-1 gap-2 overflow-auto">
						{reviewList.content.map((review, index) => (
							<PromptDetailReviewModal
								// eslint-disable-next-line react/no-array-index-key -- Test Data has Duplicate id
								key={review.id + index}
								review={review}
							/>
						))}
					</ul>
					<div className={`flex justify-center ${hasNext ? "" : "hidden"}`}>
						<Button
							className="bg-gradient-to-r from-[#d48585] to-[#ca4646]"
							onClick={moreReviewHandler}>
							<span className="font-semibold">더보기</span>
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
