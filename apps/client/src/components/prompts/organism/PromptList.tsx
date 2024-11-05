import React from "react"
import type { PromptType } from "@/types/prompts/marketPlaceType"
import PromptCard from "../molecule/prompts/PromptCard"
// import HoverPromptDetail from "../molecule/HoverPromptDetail"

interface PromptListProps {
	prompts: PromptType[]
}

function PromptList({ prompts }: PromptListProps) {
	// 여기에 호버 여부에 따라 PromptCard 또는 HoverPromptDetail 중 렌더링 한다는 로직 추가 예정
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{prompts.map((prompt) => (
				<PromptCard key={prompt.id} {...prompt} />
			))}
		</div>
	)
}

export default PromptList
