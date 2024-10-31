import React, { useState } from "react"
import Image from "next/image"
import ProfileDefaultAvatar from "@/components/common/atom/ProfileDefaultAvatar"

interface ProfileUploadProps {
	currentAvatar: string
}

export default function ProfileAvatarUpload({
	currentAvatar,
}: ProfileUploadProps) {
	const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
	const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			setSelectedFile(file)
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
		}
	}

	return (
		<div className="my-4 flex h-32 gap-4">
			<div className="relative w-32 overflow-hidden rounded-full border-2 border-white bg-[#2e4448]">
				<input
					type="hidden"
					alt={`이 input은 selectedFile쓰기용이라서 삭제해야함 ${String(selectedFile)}`}
				/>
				{currentAvatar ? (
					<Image
						src={currentAvatar}
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

			<label className="flex h-full w-32 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#1b1b1b]">
				<span className="text-white">+</span>
				<input type="file" className="hidden" onChange={handleFileChange} />
			</label>

			{previewUrl?.length ? (
				<Image
					src={previewUrl}
					alt="Current Avatar"
					width={128}
					height={128}
					className="rounded-full"
				/>
			) : null}
		</div>
	)
}
