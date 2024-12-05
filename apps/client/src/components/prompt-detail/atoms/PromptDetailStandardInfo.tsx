import StarAnimation from "@repo/ui/star-animation"

interface PromptDetailStandardInfoProps {
	productRegistDate: string
	price: number
	productName: string
	productStar: number
	reviewCount: number
}

export default function PromptDetailStandardInfo({
	productRegistDate,
	price,
	productName,
	productStar,
	reviewCount,
}: PromptDetailStandardInfoProps) {
	const formattedDate = new Date(productRegistDate).toISOString().split("T")[0]
	const formattedNumber = price.toFixed(2)

	return (
		<div className="flex flex-col gap-4">
			<p className="text-[40px] font-semibold text-white">{productName}</p>
			<div className="flex items-center justify-between text-sm text-white">
				<div className="flex items-center gap-4">
					<StarAnimation rateData={productStar} noAnimation={false} />
					<span className="font-semibold">( {reviewCount} )</span>
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
