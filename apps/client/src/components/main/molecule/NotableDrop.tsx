import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import { Card, CardContent } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import Image from "next/image"

interface NotableDropProps {
	title: string
	description: string
	tag: string
	bgImage: string
	author: {
		name: string
		profile: string
	}
}
// note - 필요하다면 border 색상 그라데이션 추가하기 / API 적용 시 적용할 API type에 맞게 수정하기
function NotableDrop({
	title,
	description,
	tag,
	bgImage,
	author,
}: NotableDropProps) {
	return (
		<Card className="relative box-content h-[600px] w-[460px] overflow-hidden rounded-[10px] border-[1px] border-[#424242] bg-[#111111] p-5 hover:border-[#DDA2FE] ">
			<div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/5 to-black" />
			<div className="relative h-full w-full overflow-hidden rounded-[10px]">
				<Image
					src={bgImage}
					alt={title}
					fill
					sizes="420px"
					className="h-full w-full object-cover"
				/>
			</div>

			{tag ? (
				<Badge className="absolute left-10 top-10 z-20 rounded-[5px] bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 hover:from-purple-700 hover:to-blue-700">
					{tag}
				</Badge>
			) : null}
			<CardContent className="absolute bottom-0 left-0 right-0 z-20 p-10">
				<h2 className=" text-[21px] font-semibold leading-[29px] text-white">
					{title}
				</h2>
				<p className="mb-5 mt-[5px] text-[#BBBBBB]">{description}</p>
				<div className="flex w-fit items-center rounded-full bg-[#161616] p-[10px]">
					<Avatar className="mr-[10px] h-[30px] w-[30px]">
						<AvatarImage src={author.profile} alt={author.name} />
						<AvatarFallback>{author.name[0]}</AvatarFallback>
					</Avatar>
					<span className="text-gray-400">{author.name}</span>
				</div>
			</CardContent>
		</Card>
	)
}

export default NotableDrop
