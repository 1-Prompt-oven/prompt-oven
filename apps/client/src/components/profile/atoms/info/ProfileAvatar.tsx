import Image from "next/image"
import React from "react"

interface ProfileAvatarProps {
	memberAvatar?: string | undefined
}

export default function ProfileAvatar({ memberAvatar }: ProfileAvatarProps) {
	return (
		<div className="relative aspect-square h-full w-28 rounded-xl border-[3px] border-white bg-white md:w-auto">
			{memberAvatar ? (
				<Image
					src={decodeURIComponent(memberAvatar)}
					sizes="(max-width: 768px) 100vw, 360px"
					fill
					alt="avatar"
					className="rounded-xl"
					priority
				/>
			) : null}
		</div>
	)
}
