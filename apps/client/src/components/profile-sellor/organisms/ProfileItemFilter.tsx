"use client"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/select"

interface PromptFilterProps {
	promptCount: number
	handleFilter: (formData: FormData) => void
}

export default function ProfileItemFilter({
	promptCount,
	handleFilter,
}: PromptFilterProps) {
	const handleSelectChange = (name: string, value: string) => {
		const formData = new FormData()
		formData.append(name, value)
		handleFilter(formData) // 선택이 변경될 때마다 handleFilter 호출
	}

	return (
		<div className="gradient-filter flex h-[3.75rem] max-w-[70.625rem] items-center justify-between rounded-lg border border-white/20 px-4">
			{/* Left Section */}
			<div className="flex items-center gap-4">
				<span className="font-mulish text-sm text-white">
					{promptCount} Results
				</span>
			</div>

			{/* Right Section */}
			<div className="flex items-center gap-4">
				<Select
					onValueChange={(value) => {
						handleSelectChange("sortBy", value)
					}}>
					<SelectTrigger className="font-mulish hidden h-[2.2rem] w-[7rem] rounded-full border border-white/20 bg-transparent text-white xs:!flex">
						<SelectValue placeholder="날짜 순서" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="DESC">최신순</SelectItem>
						<SelectItem value="ASC">오래된 순</SelectItem>
					</SelectContent>
				</Select>

				<Select
					onValueChange={(value) => {
						handleSelectChange("sortOption", value)
					}}>
					<SelectTrigger className="font-mulish h-[2.2rem] w-[7rem] rounded-full border border-white/20 bg-transparent text-white">
						<SelectValue placeholder="옵션" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="like">좋아요 순</SelectItem>
						<SelectItem value="avgStar">별점 순</SelectItem>
						<SelectItem value="sells">판매량 순</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
