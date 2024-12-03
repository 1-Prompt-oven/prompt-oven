import type { PromptsType } from "@/types/prompts/promptsType"
import type { CategoryType } from "@/types/prompts/categoryType"
import PromptsContainer from "../organism/PromptsContainer"

interface PromptsTemplateProps {
	promptList: PromptsType[]
	categoryList: CategoryType[]
}

export default function PromptsTemplate({
	promptList,
	categoryList,
}: PromptsTemplateProps) {
	const handleFilter = async (filterFormData: FormData) => {
		"use server"

		filterFormData.set("enable", "on") //프롬프트 패이지는 활성화된 상품만 보여주도록 한다.

		const payload = {
			searchBar: filterFormData.get("searchBar") as string | undefined,
			topCategoryUuid: filterFormData.get("topCategoryUuid") as
				| string
				| undefined,
			subCategoryUuid: filterFormData.get("subCategoryUuid") as
				| string
				| undefined,
			enable: filterFormData.get("enable") === "on",
			minPrice: filterFormData.get("minPrice") as string | undefined,
			maxPrice: filterFormData.get("maxPrice") as string | undefined,
			sortDate: filterFormData.get("sortDate") as string | undefined,
			sortOption: filterFormData.get("sortOption") as string | undefined,
		}

		// eslint-disable-next-line no-console -- Sidebar Filter test Console
		console.log(payload)
	}

	return (
		<section className="mx-auto mt-24 max-w-screen-xl">
			<PromptsContainer
				promptList={promptList}
				categoryList={categoryList}
				handleFilter={handleFilter}
			/>
		</section>
	)
}
