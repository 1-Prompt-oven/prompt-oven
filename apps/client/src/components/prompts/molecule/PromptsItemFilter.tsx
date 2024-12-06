"use client"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/select"

interface PromptFilterProps {
	handleFilter: (formData: FormData) => void
	allForm: FormData
}

export default function PromptsItemFilter({
	handleFilter,
	allForm,
}: PromptFilterProps) {
	const handleSelectChange = (name: string, value: string) => {
		allForm.set(name, value)
		handleFilter(allForm) // 선택이 변경될 때마다 handleFilter 호출
	}

	const isSortOptionCreateAt = allForm.get("sortOption") === "createdAt"
	const isSortOptionNull = allForm.get("sortOption") === null

	return (
		<div className="gradient-filter flex h-[3.75rem] max-w-[80rem] items-center justify-between rounded-lg border border-white/20 px-4">
			{/* Left Section */}
			<div className="flex items-center gap-4" />
			{/* <span className="font-mulish text-sm text-white">
					{promptCount} Results
				</span> */}

			<div className="flex items-center gap-4">
				{isSortOptionCreateAt || isSortOptionNull ? (
					<Select
						name="sortBy"
						onValueChange={(value) => {
							handleSelectChange("sortBy", value)
						}}>
						<SelectTrigger className="font-mulish hidden h-[2.2rem] w-[7rem] rounded-full border border-white/20 bg-transparent text-white xs:!flex">
							<SelectValue placeholder="최신 순" />
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
						<SelectValue placeholder="생성 순" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="like">좋아요 순</SelectItem>
						<SelectItem value="avgStar">별점 순</SelectItem>
						<SelectItem value="sells">판매량 순</SelectItem>
						<SelectItem value="createdAt">생성 순</SelectItem>
						<SelectItem value="reviewCount">리뷰 순</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
