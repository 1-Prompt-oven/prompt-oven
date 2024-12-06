import React from "react"
import Image from "next/image"

interface PromptDetailThumbnailProps {
	thumbnailUrl: string
	productUuid: string
}

export default function PromptDetailThumbnail({
	thumbnailUrl,
	productUuid,
}: PromptDetailThumbnailProps) {
	return (
		<div className="relative h-[600px] min-w-[380px] overflow-hidden rounded-lg sm:h-[800px] sm:min-w-[600px]">
			<div className="absolute inset-0 bg-white" />
			<Image
				sizes="(max-width: 500px) 100vw, 145px"
				src={thumbnailUrl}
				alt={productUuid}
				fill
				className="rounded-lg"
				priority
			/>
		</div>
	)
}
