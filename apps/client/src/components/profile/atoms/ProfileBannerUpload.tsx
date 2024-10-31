import Image from "next/image"
import React, { useState } from "react"

export default function ProfileBannerUpload() {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)

			// 선택한 파일을 메모리에서 해제 (필요에 따라)
			// URL.revokeObjectURL(url);
		}
	}

	return (
		<div className="mb-12">
			<p className="text-sm font-bold text-white">Banner</p>
			<p className="text-xs text-gray-500">
				Image is recommended at a ratio of 1:2 and width of 800px or more
			</p>
			<div className="flex h-32 gap-8">
				<label className="my-4 flex h-full w-60 cursor-pointer items-center justify-center border border-white bg-[#1b1b1b]">
					<span className="text-white">+</span>
					<input type="file" className="hidden" onChange={handleFileChange} />
				</label>

				{previewUrl?.length ? (
					<div className="mt-4">
						<Image
							src={previewUrl}
							width={200}
							height={100}
							alt="Preview"
							className="h-32 w-64 rounded-md object-cover"
						/>
					</div>
				) : null}
			</div>
		</div>
	)
}
