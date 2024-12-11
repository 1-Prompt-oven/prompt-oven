import { useState } from "react"
import { Button } from "@repo/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui/dialog"
import Generating from "../../atoms/generate/Generating"
import PromptGenerateSuccess from "../../atoms/generate/PromptGenerateSuccess"
import PropmtGenerateFail from "../../atoms/generate/PropmtGenerateFail"

interface OpenAIResponseType {
	created: number
	data: {
		revised_prompt: string
		url: string
	}[]
}

interface PromptGenerateProps {
	keyWord: string
}

export default function PromptGenerate({ keyWord }: PromptGenerateProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [image, setImage] = useState<string>("")
	// const sampleImage =
	// 	"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/generate/sample-generate.png" //테스트용

	const [loading, setLoading] = useState<boolean>(false)

	const handleDownload = (sample: string) => {
		window.open(`/api/download?sample=${encodeURIComponent(sample)}`, "_blank")
	}

	const handleSubmit = async () => {
		if (loading) return
		setLoading(true)

		const res = await fetch(`/api/generate/image`, {
			method: "POST",
			body: JSON.stringify({ keyWord }),
			headers: {
				"Content-Type": "application/json",
			},
		})
		if (!res.ok) {
			// eslint-disable-next-line no-console -- Fail Check - May be No Cost Error
			console.log(res)
			return
		}
		const rawData: OpenAIResponseType = (await res.json()) as OpenAIResponseType

		if (rawData.data.length > 0) {
			const imageUrl = rawData.data[0].url
			setImage(imageUrl)
		}

		setLoading(false)
	}

	return (
		<div className="flex gap-3">
			{/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button className="rounded-md bg-[#414141] px-4 py-1 font-semibold text-white">
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
			</Dialog> */}

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button
						onClick={handleSubmit}
						className="rounded-md bg-[#414141] px-4 py-1 font-semibold text-white">
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
		</div>
	)
}
