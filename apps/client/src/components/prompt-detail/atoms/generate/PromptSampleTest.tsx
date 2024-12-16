import { Button } from "@repo/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui/dialog"
import PromptGenerateSuccess from "./PromptGenerateSuccess"

interface PromptSampleTestProps {
	sampleImage: string
	handleDownload: (image: string) => void
	isOpen: boolean
	setIsOpen: (value: boolean) => void
}

export default function PromptSampleTest({
	sampleImage,
	handleDownload,
	isOpen,
	setIsOpen,
}: PromptSampleTestProps) {
	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
			<DialogTrigger asChild>
				<Button className="rounded-md bg-[#414141] px-4 py-1 text-xs font-semibold text-white">
					테스트용
				</Button>
			</DialogTrigger>
			<DialogHeader>
				<DialogTitle className="hidden">샘플 프롬프트</DialogTitle>
				<DialogDescription className="hidden">
					This is sample prompt
				</DialogDescription>
			</DialogHeader>
			<DialogContent className="mx-auto max-h-[760px] max-w-[500px] rounded border-none bg-[#252525]">
				{(() => {
					return (
						<PromptGenerateSuccess
							sampleImage={sampleImage}
							handleDownload={handleDownload}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
						/>
					)
				})()}
			</DialogContent>
		</Dialog>
	)
}
