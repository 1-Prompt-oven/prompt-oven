import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import { Card, CardContent } from "@repo/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { NotableProductWithAuthor } from "@/types/product/productUpsertType.ts"

interface NotableDropProps {
	item: NotableProductWithAuthor
}

function NotableDrop({ item }: NotableDropProps) {
	return (
		<Link href={`/prompt-detail/${item.productUuid}`}>
			<Card className="relative box-border h-[400px] w-full select-none overflow-hidden rounded-[10px] border-[1px] border-[#424242] bg-[#111111] p-3 hover:border-[#DDA2FE] sm:h-[500px] sm:p-4 md:h-[600px] md:w-[460px] md:p-5">
				<div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/5 to-black" />
				<div className="relative h-full w-full overflow-hidden rounded-[10px]">
					<Image
						src={item.thumbnailUrl || ""}
						alt={item.productName}
						fill
						unoptimized
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="h-full w-full object-cover"
					/>
				</div>

				{/*{tag ? (*/}
				{/*	<Badge className="absolute left-4 top-4 z-20 rounded-[5px] bg-gradient-to-r from-purple-600 to-blue-600 px-2 py-1 text-xs sm:!left-6 sm:!top-6 sm:!px-3 sm:!py-1.5 sm:!text-sm md:!left-8 md:!top-8 md:!px-4 md:!py-2">*/}
				{/*		{tag}*/}
				{/*	</Badge>*/}
				{/*) : null}*/}
				<CardContent className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:!p-4 md:!p-8">
					<h2 className="text-lg font-semibold leading-tight text-white sm:!text-xl md:!text-[21px] md:!leading-[29px]">
						{item.productName}
					</h2>
					<p className="mb-3 mt-1 text-sm text-[#BBBBBB] sm:!mt-2 sm:mb-4 sm:!text-base md:!mb-5 md:!mt-[5px]">
						{item.description}
					</p>
					<div className="flex w-fit items-center rounded-full bg-[#161616] p-2 sm:!p-[12px]">
						<Avatar className="mr-2 h-6 w-6 sm:!mr-[10px] sm:!h-[30px] sm:!w-[30px]">
							<AvatarImage
								src={item.author.memberProfileImage}
								alt={item.author.memberNickname}
							/>
							<AvatarFallback>{item.author.memberNickname[0]}</AvatarFallback>
						</Avatar>
						<span className="text-xs text-gray-400 sm:text-sm">
							{item.author.memberNickname}
						</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}

export default NotableDrop
