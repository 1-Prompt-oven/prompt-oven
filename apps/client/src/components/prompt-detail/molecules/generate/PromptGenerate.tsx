import { useState } from "react"
import { deductCookieAction } from "@/action/cookie/cookieAction"
import type { CookieLatestType } from "@/types/cookie/cookieResponseType"
import PromptSampleException from "../../atoms/generate/PromptSampleException"
import PromptSampleReal from "../../atoms/generate/PromptSampleReal"

interface OpenAIResponseType {
	created: number
	data: {
		revised_prompt: string
		url: string
	}[]
}

interface PromptGenerateProps {
	keyWord: string
	userCookie: CookieLatestType
}

export default function PromptGenerate({
	keyWord,
	userCookie,
}: PromptGenerateProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [image, setImage] = useState<string>("")

	//테스트용
	// const sampleImage =
	// 	"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/generate/sample-generate.png"

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
			await deductCookieAction()
		}

		setLoading(false)
	}

	return (
		<div className="flex gap-3">
			{userCookie.isUser && userCookie.count > 0 ? (
				/* 테스트용 */
				// <PromptSampleTest
				// 	isOpen={isOpen}
				// 	setIsOpen={setIsOpen}
				// 	sampleImage={sampleImage}
				// 	handleDownload={handleDownload}
				// />

				/* 실서버용 */
				<PromptSampleReal
					image={image}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					handleDownload={handleDownload}
					handleSubmit={handleSubmit}
					loading={loading}
				/>
			) : (
				<PromptSampleException
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					userCookie={userCookie}
				/>
			)}
		</div>
	)
}
