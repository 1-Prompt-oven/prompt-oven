import Link from "next/link"
import Image from "next/image"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { ShoppingCart } from "@repo/ui/lucide"
import StarAnimation from "@repo/ui/star-animation"
import { PromptCardDateFormatted, PromptIsNew } from "@/lib/utils"
import type { PromptItemType } from "@/types/prompts/promptsType"
import PromptLLMId from "../molecule/PromptLLMId"
import PromptName from "../molecule/PromptName"
import PromptPrice from "../molecule/PromptPrice"

interface PromptCardProps {
	productInfo: PromptItemType
}

export default function PromptCard({ productInfo }: PromptCardProps) {
	const formattedDate = PromptCardDateFormatted(productInfo.createdAt)
	const isNew = PromptIsNew(productInfo.createdAt)
	const hasHttp = productInfo.thumbnailUrl.includes("http") //잘못된 이미지에 대한 처리 추가

	return (
		<li className="flex justify-center">
			<Link href="/prompt-detail/1">
				<Card className="relative flex w-[220px] flex-col overflow-hidden rounded-md border-0 bg-[#111111] shadow-md">
					<div className="relative h-[260px] bg-white">
						{/* 잘못된 이미지에 대한 처리 추가 */}
						{hasHttp ? (
							<Image
								src={productInfo.thumbnailUrl}
								sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
								fill
								priority
								alt="Cyberpunk character"
							/>
						) : null}
						<Badge className="absolute left-4 top-4 border-0 bg-gradient-to-r from-[#A913F9] to-[#3F5EFB] font-bold hover:from-[#A913F9] hover:to-[#3F5EFB]">
							{isNew ? "NEW" : formattedDate}
						</Badge>
						<Button
							size="icon"
							className="absolute bottom-[-16px] right-3 z-[5] h-8 w-8 rounded-full bg-[#AD20F2] shadow-lg shadow-[#514FD7]/40 hover:bg-[#AD20F2]/90 xs:!bottom-[-18px] xs:!h-10 xs:!w-10">
							<ShoppingCart className="h-6 w-6" />
						</Button>
					</div>

					<div className="relative flex h-[130px] flex-col justify-between bg-[#3d2d50] px-3 pt-1">
						<div className="flex flex-col gap-2">
							<StarAnimation
								rateData={productInfo.reviewCount}
								noAnimation={false}
							/>

							<PromptName name={productInfo.productName} />
						</div>

						<div className="mb-2 flex items-center justify-between">
							<PromptLLMId llmId={productInfo.llmId} />
							<PromptPrice price={productInfo.price} />
						</div>
					</div>
				</Card>
			</Link>
		</li>
	)
}
