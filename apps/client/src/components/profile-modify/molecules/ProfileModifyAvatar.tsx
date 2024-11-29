import Image from "next/image"
import React from "react"

interface ProfileModifyAvatarProps {
	memberAvatar?: string | undefined
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleReset: (field: string) => void
	handleImageRemove: (field: string) => void
}

export default function ProfileModifyAvatar({
	memberAvatar,
	handleFileChange,
	handleReset,
	handleImageRemove,
}: ProfileModifyAvatarProps) {
	return (
		<div className="group relative aspect-square h-full w-28 rounded-xl border-[3px] border-white bg-white md:w-auto">
			<input type="hidden" value={memberAvatar} name="avatarImageUrl" />
			{memberAvatar ? (
				<Image
					src={memberAvatar}
					sizes="(max-width: 768px) 100vw, 360px"
					fill
					alt="avatar"
					className="rounded-xl"
					priority
				/>
			) : null}
			<div className="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-white bg-gray-800 bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				<div className="flex w-[70%] flex-col gap-2 text-[10px] font-semibold text-white md:w-[60%] md:text-sm">
					<div className="flex justify-between">
						<label className="cursor-pointer">
							<input
								type="file"
								className="hidden"
								accept="image/*"
								onChange={handleFileChange}
							/>
							<span className="hover:text-[#0da7ff]">변경</span>
						</label>
						<span className="pointer-events-none">|</span>
						<button type="button" onClick={() => handleReset("avatar")}>
							<span className="hover:text-[#0da7ff]">초기화</span>
						</button>
					</div>
					<div className="flex justify-center">
						<button type="button" onClick={() => handleImageRemove("avatar")}>
							<span className="hover:text-[#0da7ff]">제거</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
