"use client"

import Image from "next/image"

interface AvatarProps {
	src?: string
	alt?: string
	size?: "sm" | "md" | "lg"
	fallback?: string
}

export function ChAvatar({ src, alt, size = "md", fallback }: AvatarProps) {
	const sizeClasses = {
		sm: "w-9 h-9",
		md: "w-[58px] h-[58px]",
		lg: "w-[142px] h-[142px]",
	}

	return (
		<div
			className={`${sizeClasses[size]} relative flex items-center justify-center rounded-full bg-[#E2ADFF]`}>
			{src ? (
				<Image
					src={src}
					alt={alt ?? "Chat Avatar"}
					className="h-full w-full rounded-full object-cover"
				/>
			) : (
				<span className="text-lg text-white">{fallback || alt?.charAt(0)}</span>
			)}
		</div>
	)
}
