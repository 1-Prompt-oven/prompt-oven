import Image from "next/image"
import React from "react"

interface ProfileBannerProps {
	memberBanner?: string | undefined
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleReset: (field: string) => void
	handleImageRemove: (field: string) => void
}

export default function ProfileModifyBanner({
	memberBanner,
	handleFileChange,
	handleReset,
	handleImageRemove,
}: ProfileBannerProps) {
	return (
		<div className="group relative flex h-[160px] justify-center px-4 md:h-[230px] xl:h-[280px]">
			<input type="hidden" value={memberBanner} name="bannerImageUrl" />
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
						src={memberBanner}
						sizes="(max-width: 768px) 100vw, 1400px"
						fill
						className="rounded-lg"
						priority
						unoptimized
						alt="Banner"
					/>
				) : null}
				<div className="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-white bg-gray-800 bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
					<div className="flex w-[70%] justify-between text-[10px] font-semibold text-white md:w-[60%] md:text-sm">
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
						<button type="button" onClick={() => handleReset("banner")}>
							<span className="hover:text-[#0da7ff]">초기화</span>
						</button>
						<span className="pointer-events-none">|</span>
						<button type="button" onClick={() => handleImageRemove("banner")}>
							<span className="hover:text-[#0da7ff]">제거</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
