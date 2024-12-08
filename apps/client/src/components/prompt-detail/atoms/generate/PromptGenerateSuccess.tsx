import Image from "next/image"
import { Button } from "@repo/ui/button"

interface PromptGenerateSuccessProps {
	sampleImage: string
	handleDownload: (image: string) => void
}

export default function PromptGenerateSuccess({
	sampleImage,
	handleDownload,
}: PromptGenerateSuccessProps) {
	return (
		<div className="flex flex-col gap-2">
			<Image
				src={sampleImage} // props로 받은 sampleImage 사용
				alt="sampleImage"
				width={700}
				height={700}
				className="cursor-pointer rounded object-cover"
				priority
				unoptimized
				onClick={() => handleDownload(sampleImage)}
			/>
			<div className="flex justify-between">
				<div className="flex flex-col gap-1">
					<p className="text-sm text-[#b8b8b8]">
						※ 이미지 밖을 누르면 샘플 이미지 화면이 꺼집니다.
					</p>
					<p className="text-sm text-[#b8b8b8]">
						※ 프롬프트 오븐에서 제공하는 이미지는 2시간 동안 유지됩니다.
					</p>
					<p className="text-sm text-[#b8b8b8]">※ 별도의 저장 유의바랍니다.</p>
				</div>

				<Button
					onClick={() => handleDownload(sampleImage)}
					className="rounded-md">
					<span className="font-semibold">다운로드</span>
				</Button>
			</div>
		</div>
	)
}
