import Image from "next/image"
import { Button } from "@repo/ui/button"

interface PromptGenerateSuccessProps {
	sampleImage: string
	handleDownload: (image: string) => void
	isOpen: boolean
	setIsOpen: (value: boolean) => void
}

export default function PromptGenerateSuccess({
	sampleImage,
	handleDownload,
	isOpen,
	setIsOpen,
}: PromptGenerateSuccessProps) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-end">
				<Button
					type="button"
					className="bg-[#1b1b1b]"
					onClick={() => setIsOpen(!isOpen)}>
					x
				</Button>
			</div>

			<Image
				src={sampleImage} // props로 받은 sampleImage 사용
				alt="sampleImage"
				width={500}
				height={500}
				className="cursor-pointer rounded object-cover"
				priority
				unoptimized
				onClick={() => handleDownload(sampleImage)}
			/>
			<div className="flex justify-between">
				<div className="flex flex-col gap-1 text-xs text-[#b8b8b8]">
					<p>※ 이미지 밖을 누르면 샘플 이미지 화면이 꺼집니다.</p>
					<p>※ 프롬프트 오븐에서 제공하는 이미지는 2시간 동안 유지됩니다.</p>
					<p>※ 별도의 저장 유의바랍니다.</p>
				</div>

				<div className="flex items-end">
					<Button
						onClick={() => handleDownload(sampleImage)}
						className="rounded-md">
						<span className="font-semibold">다운로드</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
