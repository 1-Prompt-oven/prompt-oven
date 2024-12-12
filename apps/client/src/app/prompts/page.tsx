import { getCategory } from "@/action/prompts/getCategoryData"
import { getPromptList } from "@/action/prompts/getPromptsData"
import PromptsTemplate from "@/components/prompts/template/PromptsTemplate"

interface SearchParamsProps {
	searchParams: {
		searchBar?: string // 검색어
		topCategoryUuid?: string // 상위 카테고리 UUID
		topCategoryName?: string
		subCategoryUuid?: string // 하위 카테고리 UUID
		subCategoryName?: string
		minPrice?: string // 최소 가격
		maxPrice?: string // 최대 가격
		sortBy?: string // 정렬 기준
		sortOption?: string // 정렬 옵션 (예: ASC, DESC)
	}
}

export default async function Marketplace({ searchParams }: SearchParamsProps) {
	const promptData = await getPromptList({ searchParams })
	const categoryList = await getCategory()

	return (
		<main className="container mx-auto bg-[#111111] py-1">
			<PromptsTemplate
				promptData={promptData}
				categoryList={categoryList}
				searchParams={searchParams}
			/>
		</main>
	)
}
