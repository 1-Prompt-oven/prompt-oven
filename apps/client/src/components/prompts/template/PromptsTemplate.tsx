import type { CategoryType } from "@/types/prompts/categoryType"
import type { PromptItemType } from "@/types/prompts/promptsType"
import PromptsContainer from "../organism/PromptsContainer"

interface PromptsTemplateProps {
	promptList: PromptItemType[]
	categoryList: CategoryType[]
}

export default function PromptsTemplate({
	promptList,
	categoryList,
}: PromptsTemplateProps) {
	return (
		<section className="mx-auto mt-24 max-w-screen-2xl">
			<PromptsContainer promptList={promptList} categoryList={categoryList} />
		</section>
	)
}
