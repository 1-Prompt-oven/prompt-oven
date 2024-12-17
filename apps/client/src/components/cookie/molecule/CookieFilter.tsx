import { useState } from "react"
import { ChevronDown } from "@repo/ui/lucide"
import { Button } from "@repo/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu"
import type { CookieSortOption, Sort } from "@/types/cookie/cookieType"

interface CookieFilterProps {
	onSort: (sortOption: CookieSortOption) => void // 정렬 핸들러
	initSort?: Sort // 초기 정렬 값
}

export function CookieFilter({ onSort, initSort = "All" }: CookieFilterProps) {
	const [selectedSort, setSelectedSort] = useState<Sort>(initSort) // 정렬 상태

	// 정렬 옵션 목록
	const sortOptions: Record<Sort, string> = {
		All: "All", // null에 해당하는 옵션
		USE: "Use",
		CHARGE: "Charge",
	}

	// 정렬 변경 핸들러
	const handleSortChange = (value: Sort) => {
		setSelectedSort(value) // 상태 업데이트
		onSort(value === "All" ? undefined : value) // 부모 컴포넌트에 null 또는 "USE" / "CHARGE" 전달
	}

	return (
		<div className="flex w-full max-w-[1070px] justify-end gap-4 bg-[#1B1818] sm:flex-row sm:items-center">
			<div className="flex gap-2 sm:gap-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="flex h-11 items-center px-4 capitalize text-po-purple-50">
							{sortOptions[selectedSort]}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-56 border-po-purple-50/25 bg-[#120F1E]"
						align="end">
						<DropdownMenuRadioGroup
							value={selectedSort}
							onValueChange={(value) => handleSortChange(value as Sort)}>
							{Object.entries(sortOptions).map(([value, label]) => (
								<DropdownMenuRadioItem
									key={value}
									value={value}
									className="text-white">
									{label}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
