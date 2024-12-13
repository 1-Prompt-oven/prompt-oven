import React from "react"
import Image from "next/image"
import { getProductImage } from "@/lib/thumbnail.ts"

interface SpProductThumbnailProps {
	thumbnail: string
	productName: string
}

function SpProductThumbnail({
	thumbnail,
	productName,
}: SpProductThumbnailProps) {
	const thumbnailImage = getProductImage(productName, thumbnail)
	return (
		<div className="relative mr-4 h-[40px] w-[56px]">
			<Image
				fill
				sizes="40px 56px"
				src={thumbnailImage}
				alt={`${productName} thumbnail`}
				className="rounded-lg object-cover"
				unoptimized
			/>
		</div>
	)
}

export default SpProductThumbnail
