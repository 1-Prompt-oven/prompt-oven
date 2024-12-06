import React from "react"
import type { PromptApiResponseType } from "@/types/common/responseType"
import Image from "next/image"

function PromptSearchList({ data }: { data: PromptApiResponseType }) {
	const promptData = data.productList

	return (
		<ul>
			{promptData.map((prompt) => (
				<li key={prompt.productUuid} className="my-4 flex items-center gap-2">
					<Image
						src={prompt.thumbnailUrl}
						alt={prompt.productName}
						width={50}
						height={50}
					/>
					<span className="text-sm text-white">{prompt.productName}</span>
				</li>
			))}
		</ul>
	)
}

export default PromptSearchList

