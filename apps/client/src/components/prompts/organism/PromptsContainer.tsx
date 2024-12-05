"use client"

import { useState } from "react"
import { getPromptList } from "@/action/prompts/getPromptsData"
import type { CategoryType } from "@/types/prompts/categoryType"
import type { PromptItemType } from "@/types/prompts/promptsType"
import PromptsFilterSidebar from "../molecule/PromptsFilterSidebar"
import PromptsItemFilter from "../molecule/PromptsItemFilter"
import PromptList from "../molecule/PromptList"

interface PromptsTemplateProps {
	promptList: PromptItemType[]
	categoryList: CategoryType[]
}

export default function PromptsContainer({
	promptList,
	categoryList,
}: PromptsTemplateProps) {
	const [list, setList] = useState<PromptItemType[]>(promptList)
	const [allForm, setAllForm] = useState<FormData>(new FormData())

	const handleFilter = async (filterFormData: FormData) => {
		setAllForm(filterFormData)
		const updateList = await getPromptList(allForm)
		setList(updateList.productList)
	}

	return (
		<form action={handleFilter}>
			<div className="mx-12 mb-16 flex flex-col gap-8 md:!flex-row">
				<PromptsFilterSidebar categoryList={categoryList} />
				<div className="flex w-full flex-col gap-8">
					<PromptsItemFilter
						promptCount={promptList.length}
						handleFilter={handleFilter}
						allForm={allForm}
					/>
					<PromptList promptList={list} />
				</div>
			</div>
		</form>
	)
}
