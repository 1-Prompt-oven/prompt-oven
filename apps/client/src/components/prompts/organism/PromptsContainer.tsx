"use client"

import { useState } from "react"
import { getPromptListByCategory } from "@/action/prompts/getPromptsData"
import type { PromptsType } from "@/types/prompts/promptsType"
import type { CategoryType } from "@/types/prompts/categoryType"
import PromptsFilterSidebar from "../molecule/PromptsFilterSidebar"
import PromptsItemFilter from "../molecule/PromptsItemFilter"
import PromptList from "../molecule/PromptList"

interface PromptsTemplateProps {
	promptList: PromptsType[]
	categoryList: CategoryType[]
}

export default function PromptsContainer({
	promptList,
	categoryList,
}: PromptsTemplateProps) {
	const [list, setList] = useState<PromptsType[]>(promptList)

	const handleFilter = async (filterFormData: FormData) => {
		const updateList = await getPromptListByCategory(filterFormData)
		setList(updateList)
	}

	return (
		<form action={handleFilter}>
			<div className="mx-12 mb-16 flex flex-col gap-8 md:!flex-row">
				<PromptsFilterSidebar categoryList={categoryList} />
				<div className="flex w-full flex-col gap-8">
					<PromptsItemFilter
						promptCount={promptList.length}
						handleFilter={handleFilter}
					/>
					<PromptList promptList={list} />
				</div>
			</div>
		</form>
	)
}
