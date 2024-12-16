import { Button } from "@repo/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui/dialog"
import Generating from "./Generating"
import PromptGenerateSuccess from "./PromptGenerateSuccess"
import PropmtGenerateFail from "./PropmtGenerateFail"

interface PromptSampleRealProps {
	image: string
	isOpen: boolean
	loading: boolean
	setIsOpen: (value: boolean) => void
	handleDownload: (image: string) => void
	handleSubmit: () => void
}

export default function PromptSampleReal({
	image,
	isOpen,
	loading,
	setIsOpen,
	handleDownload,
	handleSubmit,
}: PromptSampleRealProps) {
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					onClick={handleSubmit}
					className="rounded-md bg-[#414141] px-4 py-1 font-semibold text-white hover:scale-105">
					샘플
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
					if (loading) {
						return <Generating />
					}

					if (image) {
						return (
							<PromptGenerateSuccess
								sampleImage={image}
								handleDownload={handleDownload}
								isOpen={isOpen}
								setIsOpen={setIsOpen}
							/>
						)
					}

					return <PropmtGenerateFail />
				})()}
			</DialogContent>
		</Dialog>
	)
}
