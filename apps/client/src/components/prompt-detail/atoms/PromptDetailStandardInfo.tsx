import StarAnimation from "@repo/ui/star-animation"
import { getReviewSimpleData } from "@/action/prompt-detail/getProductDetailReviewData"

interface PromptDetailStandardInfoProps {
	productUUID: string
	productRegistDate: string
	price: number
	productName: string
}

export default async function PromptDetailStandardInfo({
	productUUID,
	productRegistDate,
	price,
	productName,
}: PromptDetailStandardInfoProps) {
	const formattedDate = new Date(productRegistDate).toISOString().split("T")[0]

	const reviewData = await getReviewSimpleData(productUUID)
	const avgStar = reviewData.avgStar !== 0 ? reviewData.avgStar : 0
	const reviewCount = reviewData.reviewCount !== 0 ? reviewData.reviewCount : 0

	return (
		<div className="flex flex-col gap-4">
			<p className="text-2xl font-semibold text-white sm:!hidden">
				{productName}
			</p>
			<p className="hidden text-[40px] font-semibold text-white sm:!block">
				{productName}
			</p>
			<div className="flex items-center justify-between text-sm text-white">
				<div className="flex items-center gap-4">
					<StarAnimation rateData={avgStar} noAnimation={false} />
					<span className="font-semibold">( {reviewCount} )</span>
				</div>
				<p className="mr-4 flex gap-2">
					<span className="font-bold">등록일</span>
					<span className="font-semibold">:</span>
					<span>{formattedDate}</span>
				</p>
			</div>
			<p className="my-4 flex items-center gap-2 text-4xl font-bold text-white">
				<span className="text-4xl">₩</span>
				<span>{price}</span>
			</p>
		</div>
	)
}
