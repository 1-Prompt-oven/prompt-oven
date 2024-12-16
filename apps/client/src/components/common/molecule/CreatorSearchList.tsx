"use client"

import React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import type { ProfileForSearchListType } from "@/types/profile/profileTypes"

function CreatorSearchList({
	data,
	closeDialog,
}: {
	data: ProfileForSearchListType[]
	closeDialog: () => void
}) {
	return (
		<ul>
			{data.map((creator: ProfileForSearchListType) => (
				<Link
					onClick={() => {
						setTimeout(() => {
							closeDialog()
						}, 300)
					}}
					href={`/profile/seller/${creator.nickname}`}
					key={creator.id}>
					<li className="flex items-center justify-start gap-2 rounded-lg px-2 py-3 hover:bg-gray-800">
						<Avatar className="mr-[10px] h-[30px] w-[30px]">
							<AvatarImage src={creator.thumbnail} alt={creator.nickname} />
							<AvatarFallback>{creator.nickname}</AvatarFallback>
						</Avatar>
						<span className="text-sm text-white">{creator.nickname}</span>
					</li>
				</Link>
			))}
		</ul>
	)
}

export default CreatorSearchList

