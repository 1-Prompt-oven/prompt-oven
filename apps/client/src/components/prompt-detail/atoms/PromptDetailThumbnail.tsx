import React from "react"
import PromptImageSlide from "@/components/common/molecule/PromptImageSlide"
import type { PromptDetailContentsType } from "@/types/prompt-detail/promptDetailType"

interface PromptDetailThumbnailProps {
	contents: PromptDetailContentsType[]
}

export default function PromptDetailThumbnail({
	contents,
}: PromptDetailThumbnailProps) {
	// const contentUrls = contents.map((item) => item.contentUrl)

	return (
		<div className="relative h-[400px] min-w-[200px] overflow-hidden rounded-lg xs:h-[520px] sm:h-[680px] sm:min-w-[600px] md:h-[810px] lg:h-[640px]">
			<PromptImageSlide images={contents} />
			{/* <div className="absolute inset-0 bg-white" />
			<Image
				sizes="(max-width: 500px) 100vw, 145px"
				src={contents[0].contentUrl}
				alt={productUuid}
				fill
				className="rounded-lg"
				priority
			/> */}
		</div>
	)
}
