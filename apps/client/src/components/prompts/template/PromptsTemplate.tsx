import type { CategoryType } from "@/types/prompts/categoryType"
import type {
	PromptsType,
	PropmtsSearchParamsProps,
} from "@/types/prompts/promptsType"
import PromptsContainer from "../organism/PromptsContainer"

interface PromptsTemplateProps {
	promptData: PromptsType
	categoryList: CategoryType[]
	searchParams: PropmtsSearchParamsProps
}

export default function PromptsTemplate({
	promptData,
	categoryList,
	searchParams = {},
}: PromptsTemplateProps) {
	return (
		<section className="mx-auto mt-12 max-w-screen-2xl">
			<PromptsContainer
				promptData={promptData}
				categoryList={categoryList}
				searchParams={searchParams}
			/>
		</section>
	)
}
