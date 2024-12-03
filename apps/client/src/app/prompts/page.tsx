import { getPromptList } from "@/action/prompts/getPromptsData"
import PromptsTemplate from "@/components/prompts/template/PromptsTemplate"

export default async function Marketplace() {
	// const promptTop = await getPromptTop()
	const promptList = await getPromptList()

	return (
		<main className="container mx-auto bg-[#111111] py-1">
			<PromptsTemplate promptList={promptList} />
		</main>
	)
}

