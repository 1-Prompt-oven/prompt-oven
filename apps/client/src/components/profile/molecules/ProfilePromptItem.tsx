import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "@repo/ui/lucide"
import { Card } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import StarAnimation from "@repo/ui/star-animation"
import type { ProfileListCardType } from "@/types/profile/profileTypes"
import { PromptCardDateFormatted, PromptIsNew } from "@/lib/utils"

interface ProfileCardProps {
	productInfo: ProfileListCardType
}

export default function ProfilePromptItem({ productInfo }: ProfileCardProps) {
	const formattedDate = PromptCardDateFormatted(productInfo.productRegistDate)
	const isNew = PromptIsNew(productInfo.productRegistDate)

	return (
		<li className="flex justify-center">
			<Link href="/prompt-detail/1">
				<Card className="relative flex w-[150px] flex-col overflow-hidden rounded-md border-0 bg-[#111111] shadow-md xs:w-[220px]">
					<div className="relative h-[200px] xs:h-[300px]">
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

					<div className="relative flex h-[110px] flex-col gap-1 bg-[#3d2d50] px-2 pt-1 xs:px-3">
						<StarAnimation
							rateData={productInfo.productStar}
							noAnimation={false}
						/>

						<div className="ml-1 space-y-1 xs:space-y-5">
							<h3 className="font-lato text-sm font-semibold text-white sm:!text-base">
								{productInfo.productName}
							</h3>
							<p className="font-lato text-xs text-[#827682]">
								{productInfo.categoryName}
							</p>
						</div>

						<span className="font-lato bottom-2 right-3 ml-1 mt-1 text-xs text-white xs:absolute xs:mt-0 xs:!text-base">
							{productInfo.productPrice.toLocaleString()}$
						</span>
					</div>
				</Card>
			</Link>
		</li>
	)
}
