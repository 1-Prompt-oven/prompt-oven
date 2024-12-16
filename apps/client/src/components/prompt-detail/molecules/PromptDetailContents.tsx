"use client"

import { useState } from "react"
import { Button } from "@repo/ui/button"
import type { PromptDetailContentsType } from "@/types/prompt-detail/promptDetailType"
import type { CookieLatestType } from "@/types/cookie/cookieResponseType"
import PromptDetailContent from "../atoms/PromptDetailProductDescription"

interface PromptDetailContentsProps {
	productContents: PromptDetailContentsType[]
	userCookie: CookieLatestType
}

export default function PromptDetailContents({
	productContents,
	userCookie,
}: PromptDetailContentsProps) {
	const [selectedContent, setSelectedContent] = useState<number>(0)

	const handleContent = (contentNum: number) => {
		setSelectedContent(contentNum)
	}

	return (
		<div className="flex flex-col gap-2 lg:mt-8">
			<div className="mx-2 flex items-end justify-between gap-4">
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
				{userCookie.isUser ? (
					<p className="my-2 flex gap-1 text-xs text-[#888888]">
						<span>잔여 쿠키 :</span>
						<span className="font-semibold text-[#d3d3d3]">
							{userCookie.count}개
						</span>
					</p>
				) : null}
			</div>

			<PromptDetailContent
				productContent={productContents[selectedContent]}
				userCookie={userCookie}
			/>
		</div>
	)
}
