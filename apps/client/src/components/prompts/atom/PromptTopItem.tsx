import Image from "next/image"
import { Card } from "@repo/ui/card"
import { Trophy } from "@repo/ui/lucide"
import type { PromptsType } from "@/types/prompts/promptsType"

interface PrompToptItemProps {
	promptTop: PromptsType
	rank: number
}

export default function PrompToptItem({ promptTop, rank }: PrompToptItemProps) {
	let cardHeight
	let cartWidth
	let trophyColor

	if (rank === 0) {
		cardHeight = "h-[180px] md:h[200px] xl:h-[220px]"
		cartWidth = "max-w-[230px]"
		trophyColor = "text-[#FFD700]"
	} else if (rank === 1) {
		cardHeight = "h-[160px] md:h[180px] xl:h-[200px]"
		cartWidth = "max-w-[200px]"
		trophyColor = "text-[#C0C0C0]"
	} else if (rank === 4) {
		cardHeight = "h-[120px] md:h[140px] xl:h-[160px]"
		cartWidth = "max-w-[180px]"
		trophyColor = "text-[#B87333]"
	} else {
		cardHeight = "h-[140px] md:h[160px] xl:h-[180px]"
		cartWidth = "max-w-[200px]"
		trophyColor = "text-[#B87333]"
	}

	return (
		<Card
			className={`flex h-full w-full ${cartWidth} flex-col overflow-hidden rounded-md border-0 bg-[#111111] shadow-md`}>
			<div className={`relative ${cardHeight}`}>
				<Image
					src={promptTop.thumbnailUrl}
					sizes="(max-width: 768px) 100vw, 1400px"
					fill
					priority
					alt="Cyberpunk character"
				/>
			</div>

			<div className="flex items-center justify-between rounded-b-lg border border-white/20 bg-gradient-to-r from-[#3F1C24] to-[#262038] p-1">
				<div className="relative">
					<Trophy className={`${trophyColor} h-5 w-5 md:h-7 md:w-7`} />
					<p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[72%] transform">
						<span
							className={`text-[10px] font-semibold md:text-xs ${trophyColor}`}>
							{rank + 1}
						</span>
					</p>
				</div>
				<p className="mr-2 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-normal text-white md:text-sm md:font-semibold">
					{promptTop.productName}
				</p>
			</div>

			{/* Top Prompts Description 보류 */}
			{/* <div className="flex h-[107px] flex-col gap-2 bg-[#3d2d50] pl-2 pt-1 md:h-[107px]">
				<StarRate value={promptTop.avgStar} />
				<PromptName promptName={promptTop.productName} />

				<div className="flex items-center justify-between">
					<PromptCategory llmId={promptTop.llmId} />
					<PromptPrice price={promptTop.price} />
				</div>
			</div> */}
		</Card>
	)
}
