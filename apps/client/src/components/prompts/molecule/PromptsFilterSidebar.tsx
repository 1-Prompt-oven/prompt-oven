"use client"

import { useEffect, useState } from "react"
import type { CategoryType } from "@/types/prompts/categoryType"
import type { PropmtsSearchParamsProps } from "@/types/prompts/promptsType"
import { PromptsFilterCategory } from "../atom/PromptsFilterCategory"
import { PromptsFilterPrice } from "../atom/PromptsFilterPrice"
import { PromptsFilterSearchInput } from "../atom/PromptsFilterSearchInput"
import PromptSidebarButtonGroup from "../atom/PromptSidebarButtonGroup"
import { PromptsFilterSection } from "./PromptsFilterSection"

interface PromptFilterSidebarProps {
	categoryList: CategoryType[]
	searchParams: PropmtsSearchParamsProps
}

export default function PromptsFilterSidebar({
	categoryList,
	searchParams,
}: PromptFilterSidebarProps) {
	const [sidebarPosition, setSidebarPosition] = useState(0)

	const [filters, setFilters] = useState({
		search: searchParams.searchBar || "",
		enable: [] as string[],
		minPrice: searchParams.minPrice || "",
		maxPrice: searchParams.maxPrice || "",
	})

	const handleClear = () => {
		setFilters({
			search: "",
			enable: [],
			minPrice: "",
			maxPrice: "",
		})
	}

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY
			setSidebarPosition(scrollY * 0.001)
		}

		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	return (
		<div
			className="z-[10] hidden h-full rounded-lg bg-opacity-20 bg-gradient-to-r from-[#3F1C24] to-[#262038] p-4 xs:!flex xs:flex-col lg:sticky lg:!block lg:max-w-[200px]"
			style={{
				top: Math.max(sidebarPosition, 100),
			}}>
			<div className="flex justify-between md:!block">
				<h2 className="mb-4 font-semibold text-white">Filter by</h2>

				<PromptsFilterSearchInput
					value={filters.search}
					name="searchBar"
					onChange={(value) => setFilters({ ...filters, search: value })}
				/>
			</div>

			<PromptsFilterSection title="Category">
				<PromptsFilterCategory
					categoryList={categoryList}
					topCategoryUUID={searchParams.topCategoryUuid || ""}
					topCategoryName={searchParams.topCategoryName || ""}
					subCategoryUUID={searchParams.subCategoryUuid || ""}
					subCategoryName={searchParams.subCategoryName || ""}
				/>
			</PromptsFilterSection>

			<PromptsFilterSection title="Price">
				<PromptsFilterPrice
					minName="minPrice"
					maxName="maxPrice"
					minValue={filters.minPrice}
					maxValue={filters.maxPrice}
					onMinChange={(value) => setFilters({ ...filters, minPrice: value })}
					onMaxChange={(value) => setFilters({ ...filters, maxPrice: value })}
				/>
			</PromptsFilterSection>

			<PromptSidebarButtonGroup onClear={handleClear} />
		</div>
	)
}
