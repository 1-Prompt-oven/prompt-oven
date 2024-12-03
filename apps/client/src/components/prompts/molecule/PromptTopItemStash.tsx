import Image from "next/image"
import StarAnimation from "@repo/ui/star-animation"
import { Card } from "@repo/ui/card"
import type { PromptsType } from "@/types/prompts/promptsType"
import PromptLLMId from "../atom/PromptLLMId"
import PromptName from "../atom/PromptName"
import PromptPrice from "../atom/PromptPrice"

interface PrompToptItemProps {
	promptTop: PromptsType
	rank: number
}

export default function PromptTopItemStash({
	promptTop,
	rank,
}: PrompToptItemProps) {
	return (
		<Card className="flex h-full w-full max-w-[230px] flex-col overflow-hidden rounded-md border-0 shadow-md">
			<div className="relative h-[130px] w-[150px] lg:h-[160px] lg:w-[180px]">
				<Image
					src={promptTop.thumbnailUrl}
					sizes="(max-width: 768px) 100vw, 1400px"
					fill
					priority
					alt="Image"
				/>
				{rank}
			</div>
			<div className="flex h-[107px] flex-col gap-2 bg-[#3d2d50] pl-2 pt-1">
				<StarAnimation rateData={promptTop.avgStar} noAnimation={false} />
				<PromptName promptName={promptTop.productName} />
				<div className="flex items-center justify-between">
					<PromptLLMId llmId={promptTop.llmId} />
					<PromptPrice price={promptTop.price} />
				</div>
			</div>
		</Card>
	)
}
