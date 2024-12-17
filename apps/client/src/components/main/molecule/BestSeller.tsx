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
	// Ensure number is a valid number before converting to string
	const displayNumber =
		typeof number === "number" ? number.toString().padStart(2, "0") : "00"

	// Ensure earnings is a valid number before formatting
	const displayEarnings =
		typeof earnings === "number" ? earnings.toLocaleString() : "0"

	return (
		<Link href={`/profile/seller/${nickname}`}>
			<Card className="relative box-border flex h-[90px] min-w-[220px] max-w-[345px] items-center rounded-[10px] border-[#424242] bg-[#111111] py-5 pl-[15px] pr-5 hover:border-[#FCB808]">
				<span className="font-roboto text-[15px] font-normal leading-[20px] text-[#969696]">
					{displayNumber}
				</span>

				<div className="relative mx-[15px]">
					<Avatar className="h-[50px] w-[50px] bg-gray-600">
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
						<TickMarkSvg className="!absolute -bottom-1 -right-1" />
					) : null}
					<TickMarkSvg className="!absolute -bottom-1 -right-1" />
				</div>

				<div className="flex flex-col justify-center">
					<span className="mb-[3px] font-roboto text-[15px] font-medium text-white">
						{nickname || "Seller Name"}
					</span>
					<span className="flex items-center font-roboto text-[13px] font-normal leading-[19px] text-[#BBBBBB]">
						<TrendingUp className="mr-2 h-4 w-4" />
						{displayEarnings}
					</span>
				</div>
			</Card>
		</Link>
	)
}
