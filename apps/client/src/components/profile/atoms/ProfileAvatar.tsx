import Image from "next/image"
import React from "react"
import ProfileDefaultAvatar from "@/components/common/atom/ProfileDefaultAvatar"

interface AvatarProps {
	avatar: string
}

export default function ProfileAvatar({ avatar }: AvatarProps) {
	return (
		<div className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-white bg-[#2e4448]">
			{avatar ? (
				<Image
					src={avatar}
					layout="fill"
					objectFit="cover"
					alt="Profile Banner"
					priority
				/>
			) : (
				// <div className="flex h-full items-center justify-center text-black">
				// 	<span>No Avatar</span>
				// </div>
				<ProfileDefaultAvatar />
			)}
		</div>
	)
}
