"use client"

import { usePathname, useRouter } from "next/navigation"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/select"
import type { PropmtsSearchParamsProps } from "@/types/prompts/promptsType"

interface PromptFilterProps {
	handleFilter: (formData: FormData) => void
	allForm: FormData
	searchParams: PropmtsSearchParamsProps
}

export default function PromptsItemFilter({
	handleFilter,
	allForm,
	searchParams = {},
}: PromptFilterProps) {
	const router = useRouter()
	const pathname = usePathname()

	const handleSelectChange = (name: string, value: string) => {
		allForm.set(name, value)
		handleFilter(allForm)

		const nesSearchParams = new URLSearchParams(window.location.search)
		nesSearchParams.set(name, value)

		if (name === "sortOption" && value !== "createAt") {
			nesSearchParams.set("sortBy", "DESC")
		}

		router.push(`${pathname}?${nesSearchParams.toString()}`)
	}

	const sortBy = searchParams.sortBy
	const sortOption = searchParams.sortOption
	const isSortOptionValid =
		sortOption === "createdAt" || sortOption === "" || sortOption === undefined

	const sortByPlaceholder = sortBy !== "ASC" ? "최신 순" : "오래된 순"
	let sortOptionPlaceholder
	if (sortOption === "like") sortOptionPlaceholder = "좋아요 순"
	else if (sortOption === "avgStar") sortOptionPlaceholder = "별점 순"
	else if (isSortOptionValid) sortOptionPlaceholder = "생성 순"

	return (
		<div className="gradient-filter flex h-[3.75rem] max-w-[80rem] items-center justify-between rounded-lg border border-white/20 px-4">
			<div className="flex items-center gap-4" />
			{/* <span className="font-mulish text-sm text-white">
					{promptCount} Results
				</span> */}

			<div className="flex items-center gap-4">
				{isSortOptionValid ? (
					<Select
						name="sortBy"
						onValueChange={(value) => {
							handleSelectChange("sortBy", value)
						}}>
						<SelectTrigger className="font-mulish hidden h-[2.2rem] w-[7rem] rounded-full border border-white/20 bg-transparent text-white xs:!flex">
							<SelectValue placeholder={sortByPlaceholder} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="DESC">최신 순</SelectItem>
							<SelectItem value="ASC">오래된 순</SelectItem>
						</SelectContent>
					</Select>
				) : null}

				<Select
					name="sortOption"
					onValueChange={(value) => {
						handleSelectChange("sortOption", value)
					}}>
					<SelectTrigger className="font-mulish h-[2.2rem] w-[7rem] rounded-full border border-white/20 bg-transparent text-white">
						<SelectValue placeholder={sortOptionPlaceholder} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="like">좋아요 순</SelectItem>
						<SelectItem value="avgStar">별점 순</SelectItem>
						<SelectItem value="createdAt">생성 순</SelectItem>
						{/* <SelectItem value="sells">판매량 순</SelectItem> */}
						{/* <SelectItem value="reviewCount">리뷰 순</SelectItem> */}
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
