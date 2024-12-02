import Image from "next/image"
import React from "react"

interface ProfileBannerProps {
	memberBanner?: string | undefined
}

export default function ProfileBanner({ memberBanner }: ProfileBannerProps) {
	return (
		<div className="relative flex h-[200px] justify-center px-4 md:h-[230px] xl:h-[280px]">
			<div
				className="h-full w-full rounded-lg bg-gradient-to-r from-[#A913F9] to-[#F913C4]"
				style={{
					transform: "rotate(3.2deg)",
					zIndex: 0,
				}}
			/>
			<div className="absolute inset-0 z-[2] overflow-hidden rounded-lg bg-[#1b1b1b]">
				{memberBanner ? (
					<Image
						src={decodeURIComponent(memberBanner)}
						sizes="(max-width: 768px) 100vw, 1400px"
						fill
						className="rounded-lg"
						priority
						alt="Banner"
					/>
				) : null}
			</div>
		</div>
	)
}
