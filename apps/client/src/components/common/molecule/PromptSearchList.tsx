"use client"

import Image from "next/image"
import Link from "next/link"
import type { PromptApiResponseType } from "@/types/common/responseType"

function PromptSearchList({ data }: { data: PromptApiResponseType }) {
	const promptData = data.productList

	return (
		<ul>
			{promptData.map((prompt) => (
				<Link
					href={`/prompt-detail/${prompt.productUuid}`}
					key={prompt.productUuid}>
					<li
						key={prompt.productUuid}
						className="flex items-center gap-2 rounded-lg py-2 hover:bg-gray-800">
						<Image
							src={prompt.thumbnailUrl}
							alt={prompt.productName}
							width={50}
							height={50}
						/>
						<span className="text-sm text-white">{prompt.productName}</span>
					</li>
				</Link>
			))}
		</ul>
	)
}

export default PromptSearchList

