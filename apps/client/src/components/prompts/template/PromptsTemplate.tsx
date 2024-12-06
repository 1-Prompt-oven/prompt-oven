import type { CategoryType } from "@/types/prompts/categoryType"
import type { PromptsType } from "@/types/prompts/promptsType"
import PromptsContainer from "../organism/PromptsContainer"

interface PromptsTemplateProps {
	promptData: PromptsType
	categoryList: CategoryType[]
}

export default function PromptsTemplate({
	promptData,
	categoryList,
}: PromptsTemplateProps) {
	return (
		<section className="mx-auto mt-24 max-w-screen-2xl">
			<PromptsContainer promptData={promptData} categoryList={categoryList} />
		</section>
	)
}
