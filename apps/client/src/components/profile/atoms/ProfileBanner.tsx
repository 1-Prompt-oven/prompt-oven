import Image from "next/image"
import React from "react"

interface BannerProps {
	banner: string
}

export default function ProfileBanner({ banner }: BannerProps) {
	return (
		<div className="relative h-[200px] w-full overflow-hidden rounded-md bg-[#420350]">
			{banner ? (
				<Image
					src={banner}
					layout="fill"
					objectFit="cover"
					alt="Profile Banner"
					priority
				/>
			) : (
				<div className="flex h-full items-center justify-center text-[#420350]">
					<span>No Banner</span>
				</div>
			)}
		</div>
	)
}
