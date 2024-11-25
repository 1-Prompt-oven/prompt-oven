import Image from "next/image"
import Link from "next/link"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import StarAnimation from "@repo/ui/star-animation"
import { ShoppingCart } from "@repo/ui/lucide"
import { PromptCardDateFormatted, PromptIsNew } from "@/lib/utils"
import type { PromptsType } from "@/types/prompts/promptsType"

interface PromptItemProps {
	productInfo: PromptsType
}

export default function PromptItem({ productInfo }: PromptItemProps) {
	const formattedDate = PromptCardDateFormatted(productInfo.productRegistDate)
	const isNew = PromptIsNew(productInfo.productRegistDate)

	return (
		<li className="flex justify-center">
			<Link href="/prompt-detail/1">
				<Card className="relative flex w-[220px] flex-col overflow-hidden rounded-md border-0 bg-[#111111] shadow-md">
					<div className="relative h-[260px]">
						<Image
							src={productInfo.thumbnailUrl}
							sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
							fill
							priority
							alt="Cyberpunk character"
						/>
						<Badge className="absolute left-4 top-4 border-0 bg-gradient-to-r from-[#A913F9] to-[#3F5EFB] font-bold hover:from-[#A913F9] hover:to-[#3F5EFB]">
							{isNew ? "NEW" : formattedDate}
						</Badge>
						<Button
							size="icon"
							className="absolute bottom-[-16px] right-3 z-10 h-8 w-8 rounded-full bg-[#AD20F2] shadow-lg shadow-[#514FD7]/40 hover:bg-[#AD20F2]/90 xs:!bottom-[-18px] xs:!h-10 xs:!w-10">
							<ShoppingCart className="h-6 w-6" />
						</Button>
					</div>

					<div className="relative flex h-[110px] flex-col gap-1 bg-[#3d2d50] px-3 pt-1">
						<StarAnimation
							rateData={productInfo.productStar}
							noAnimation={false}
						/>

						<div className="ml-1 space-y-5">
							<h3 className="font-lato text-base font-semibold text-white">
								{productInfo.productName}
							</h3>
							<p className="font-lato text-xs text-[#827682]">
								{productInfo.llmId}
							</p>
						</div>

						<span className="font-lato absolute bottom-2 right-3 ml-1 mt-0 !text-base text-white">
							{productInfo.productPrice.toLocaleString()}$
						</span>
					</div>
				</Card>
			</Link>
		</li>
	)
}
