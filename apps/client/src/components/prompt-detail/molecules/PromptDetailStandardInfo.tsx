import React from "react"
import StarAnimation from "@repo/ui/star-animation"

interface PromptDetailStandardInfoProps {
	createdAt: string
	price: number
	productName: string
	avgStar: number
	productReviewCount: number
}

export default function PromptDetailStandardInfo({
	createdAt,
	price,
	productName,
	avgStar,
	productReviewCount,
}: PromptDetailStandardInfoProps) {
	const formattedDate = new Date(createdAt).toISOString().split("T")[0]
	const formattedNumber = price.toFixed(2)

	return (
		<div className="flex flex-col gap-4">
			<p className="text-[40px] font-semibold text-white">{productName}</p>
			<div className="flex items-center justify-between text-sm text-white">
				<div className="flex items-center gap-4">
					<StarAnimation rateData={avgStar} noAnimation={false} />
					<span className="font-semibold">( {productReviewCount} )</span>
				</div>
				<p className="mr-4 flex gap-2">
					<span className="font-bold">등록일</span>
					<span className="font-semibold">:</span>
					<span>{formattedDate}</span>
				</p>
			</div>
			<p className="my-4 text-5xl font-bold text-white">
				<span className="text-4xl">$</span>
				{formattedNumber}
			</p>
		</div>
	)
}
