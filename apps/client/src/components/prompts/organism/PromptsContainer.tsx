import type { PromptsType } from "@/types/prompts/promptsType"
import PromptsFilterSidebar from "../molecule/PromptsFilterSidebar"
import PromptsItemFilter from "../molecule/PromptsItemFilter"
import PromptList from "../molecule/PromptList"

interface PromptsTemplateProps {
	promptList: PromptsType[]
	handleFilter: (formData: FormData) => void // Ensure this is correctly typed
}

export default function PromptsContainer({
	promptList,
	handleFilter,
}: PromptsTemplateProps) {
	return (
		<form action={handleFilter}>
			<div className="mx-12 mb-16 flex flex-col gap-8 md:!flex-row">
				<PromptsFilterSidebar />
				<div className="flex w-full flex-col gap-8">
					<PromptsItemFilter
						promptCount={promptList.length}
						handleFilter={handleFilter}
					/>
					<PromptList promptList={promptList} />
				</div>
			</div>
		</form>
	)
}

