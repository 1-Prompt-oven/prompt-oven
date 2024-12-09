"use client"

import React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import type { ProfileForSearchListType } from "@/types/profile/profileTypes"

function CreatorSearchList({ data }: { data: ProfileForSearchListType[] }) {
	return (
		<ul>
			{data.map((creator: ProfileForSearchListType) => (
				<Link href={`/profile/${creator.id}`} key={creator.id}>
					<li
						key={creator.id}
						className="flex items-center justify-start gap-3">
						<Avatar className="mr-[10px] h-[30px] w-[30px]">
							<AvatarImage src={creator.thumbnail} alt={creator.nickname} />
							<AvatarFallback>{creator.nickname}</AvatarFallback>
						</Avatar>
						<span>{creator.nickname}</span>
					</li>
				</Link>
			))}
		</ul>
	)
}

export default CreatorSearchList

