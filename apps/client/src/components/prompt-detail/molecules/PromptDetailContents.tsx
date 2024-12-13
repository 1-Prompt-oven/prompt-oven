"use client"

import { useState } from "react"
import { Button } from "@repo/ui/button"
import type { PromptDetailContentsType } from "@/types/prompt-detail/promptDetailType"
import PromptDetailContent from "../atoms/PromptDetailProductDescription"

interface PromptDetailContentsProps {
	productContents: PromptDetailContentsType[]
}

export default function PromptDetailContents({
	productContents,
}: PromptDetailContentsProps) {
	const [selectedContent, setSelectedContent] = useState<number>(0)

	const handleContent = (contentNum: number) => {
		setSelectedContent(contentNum)
	}

	return (
		<div className="flex flex-col gap-2 lg:mt-8">
			<div className="flex gap-4">
				{productContents.map((content, index) => (
					<Button
						key={content.contentOrder}
						className={`my-2 hover:bg-[#cd74fd] ${selectedContent === index ? "bg-[#a913f9]" : ""}`}
						onClick={() => handleContent(index)}>
						{index + 1}
					</Button>
				))}
			</div>

			<PromptDetailContent productContent={productContents[selectedContent]} />
		</div>
	)
}
