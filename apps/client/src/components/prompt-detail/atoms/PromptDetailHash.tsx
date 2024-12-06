import { getLLMName } from "@/action/prompts/getPromptsData"

interface PromptDetailDescriptionProps {
	llmid: number
	description: string
}

export default async function PromptDetailDescription({
	llmid,
	description,
}: PromptDetailDescriptionProps) {
	const llmName = await getLLMName(llmid)

	return (
		<div className="flex max-w-[600px] flex-col gap-4">
			<div className="text-2xl font-semibold text-white">{llmName}</div>
			<div className="text-base text-[#bbbbbb]">{description}</div>
		</div>
	)
}
