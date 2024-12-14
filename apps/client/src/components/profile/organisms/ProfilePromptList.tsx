"use client"

import { useState } from "react"
import PromptCard from "@/components/common/organism/PromptCard"
import type { PromptItemType } from "@/types/prompts/promptsType"
import ProfileLoadMore from "../atoms/ProfileLoadMore"

interface ProfileListProps {
	listData: PromptItemType[]
	// initialData: {
	// 	items: PromptsType[] // 초기 데이터
	// 	nextCursor: string | null // 다음 커서
	// }
}

export default function ProfilePromptList({ listData }: ProfileListProps) {
	const [hoverItem, setHoverItem] = useState<string>("")

	return (
		<div>
			<ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{listData.length > 0
					? listData.map((item) => (
							<PromptCard
								key={item.productUuid}
								productInfo={item}
								hoverItem={hoverItem}
								setHoverItem={setHoverItem}
							/>
						))
					: null}
			</ul>

			<ProfileLoadMore />
		</div>
	)
}
