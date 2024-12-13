"use client"

import { useState } from "react"
import PromptCard from "@/components/common/organism/PromptCard"
import type { PromptItemType } from "@/types/prompts/promptsType"

interface FavoriteListProps {
	favoriteList: PromptItemType[]
}

export default function FavoriteList({ favoriteList }: FavoriteListProps) {
	const [hoverItem, setHoverItem] = useState<string>("")

	return (
		<div className="mx-auto w-full">
			{favoriteList.length > 0 ? (
				<ul className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{favoriteList.map((item) => (
						<PromptCard
							productInfo={item}
							key={item.productUuid}
							hoverItem={hoverItem}
							setHoverItem={setHoverItem}
						/>
					))}
				</ul>
			) : (
				<div className="flex h-[400px] items-center justify-center">
					<span className="text-[#969696]">찜한 프롬프트가 없습니다..</span>
				</div>
			)}
		</div>
	)
}
