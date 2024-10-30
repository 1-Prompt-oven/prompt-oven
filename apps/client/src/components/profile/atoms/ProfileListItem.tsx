import Image from "next/image"
import Link from "next/link"
import React from "react"
import type { ProfileListType } from "@/types/profile/profileTypes"

interface PromptItemProps {
	promptData: ProfileListType
}

export default function ProfileListItem({ promptData }: PromptItemProps) {
	return (
		<div className="relative flex h-full flex-col bg-transparent">
			<div className="border-1 absolute left-1 top-1 z-10 rounded-sm border-black bg-[#1b1b1b] text-base text-white xl:text-sm 2xl:text-xs">
				<span className="mx-1">{promptData.categoryName}</span>
			</div>
			<div className="relative flex-grow overflow-hidden">
				<Link href={`product/${promptData.productUUID}`}>
					<Image
						src={promptData.thumbnailUrl}
						layout="fill"
						objectFit="cover"
						alt={promptData.productUUID}
						priority
					/>
				</Link>
			</div>
			<div className="flex justify-between bg-[#1b1b1b] text-base text-white xl:text-sm 2xl:text-xs">
				<span className="ml-1">{promptData.productName}</span>
				<span className="mr-1">${promptData.productPrice}</span>
			</div>
		</div>
	)
}
