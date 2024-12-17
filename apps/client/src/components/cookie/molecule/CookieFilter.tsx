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
import type {
	CookieStatusOption,
	Sort,
	SortDirection,
	CookieSortOption,
} from "@/types/cookie/cookieType"

interface CookieFilterProps {
	onSort: (
		sortOption: undefined | "USE" | "CHARGE",
		sortBy: "ASC" | "DESC",
	) => void
	initSort?: Sort
	initSortDirection?: SortDirection
	initStatus?: CookieStatusOption
}

function setSort(sort: Sort, sortDirection: SortDirection) {
	if (sort === "USE")
		return sortDirection === "ASC" ? "price_low_high" : "price_high_low"
	if (sort === "CHARGE")
		return sortDirection === "ASC" ? "sells_low_high" : "sells_high_low"
	return sortDirection === "ASC" ? "created_old_new" : "created_new_old"
}

export function CookieFilter({
	onSort,
	initSort = "USE",
	initSortDirection = "DESC",
}: CookieFilterProps) {
	const [selectedSort, setSelectedSort] = useState<CookieSortOption>("All") // 현재 선택된 정렬 상태를 저장
	const sort = setSort(initSort, initSortDirection)

	const sortOptions: Record<CookieSortOption, string> = {
		All: "All",
		Use: "Use",
		Charge: "Charge",
	}

	const handleSortChange = (value: CookieSortOption) => {
		setSelectedSort(value) // 선택한 값을 상태로 저장
		onSort(value as Sort, initSortDirection) // 선택 이벤트를 상위 컴포넌트에 전달
	}

	return (
		<div className="flex w-full max-w-[1070px] justify-end gap-4 bg-[#1B1818] sm:flex-row sm:items-center">
			<div className="flex gap-2 sm:gap-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="flex h-11 items-center px-4 capitalize text-po-purple-50">
							{selectedSort}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-56 border-po-purple-50/25 bg-[#120F1E]"
						align="end">
						<DropdownMenuRadioGroup
							value={sort}
							onValueChange={(value) =>
								handleSortChange(value as CookieSortOption)
							}>
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
