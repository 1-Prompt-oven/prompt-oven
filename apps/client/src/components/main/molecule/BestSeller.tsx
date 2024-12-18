import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import { Card } from "@repo/ui/card"
import React from "react"
import { TrendingUp } from "@repo/ui/lucide"
import Link from "next/link"
import TickMarkSvg from "@/components/main/atom/icon/TickMarkSvg.tsx"

interface SellerProps {
	number?: number
	nickname?: string
	earnings?: number
	isVerified?: boolean
	sellerImage?: string
}

export default function Seller({
	number = 8,
	nickname = "Creator Name",
	earnings = 1643063,
	isVerified = true,
	sellerImage = "/img/main/notableDropAvatar1.png",
}: SellerProps) {
	const displayNumber =
		typeof number === "number" ? number.toString().padStart(2, "0") : "00"

	const displayEarnings =
		typeof earnings === "number" ? earnings.toLocaleString() : "0"

	return (
		<Link href={`/profile/seller/${nickname}`}>
			<Card className="relative box-border flex h-auto min-h-[70px] w-full items-center rounded-[10px] border-[#424242] bg-[#111111] px-3 py-3 hover:border-[#FCB808] sm:h-[90px] sm:min-w-[220px] sm:max-w-[345px] sm:py-5 sm:pl-[15px] sm:pr-5">
				<span className="font-roboto text-[13px] font-normal leading-[20px] text-[#969696] sm:text-[15px]">
					{displayNumber}
				</span>

				<div className="relative mx-2 sm:mx-[15px]">
					<Avatar className="h-[40px] w-[40px] bg-gray-600 sm:h-[50px] sm:w-[50px]">
						{sellerImage ? (
							<AvatarImage
								src={sellerImage}
								alt="Seller_avatar.png"
								className="object-cover"
							/>
						) : null}
						<AvatarFallback>{nickname[0] || "CN"}</AvatarFallback>
					</Avatar>
					{isVerified ? (
						<TickMarkSvg className="!absolute -bottom-1 -right-1 h-4 w-4 sm:h-5 sm:w-5" />
					) : null}
				</div>

				<div className="flex flex-col justify-center">
					<span className="mb-[2px] font-roboto text-[13px] font-medium text-white sm:mb-[3px] sm:text-[15px]">
						{nickname || "Seller Name"}
					</span>
					<span className="flex items-center font-roboto text-[11px] font-normal leading-[15px] text-[#BBBBBB] sm:text-[13px] sm:leading-[19px]">
						<TrendingUp className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
						{displayEarnings}
					</span>
				</div>
			</Card>
		</Link>
	)
}
