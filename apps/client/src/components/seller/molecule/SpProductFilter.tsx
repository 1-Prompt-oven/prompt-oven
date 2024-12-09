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
	ProductSortOption,
	ProductStatusOption,
	Sort,
	SortDirection,
} from "@/types/seller/sellerProduct"
import SpSearchBar from "@/components/seller/atom/SpSearchBar.tsx"

interface ProductFilterProps {
	onSearch: (searchTerm: string) => void
	onSort: (
		sortOption: "price" | "sells" | "createdAt",
		sortBy: "ASC" | "DESC",
	) => void
	onStatusChange: (status: ProductStatusOption) => void
	initSort?: Sort
	initSortDirection?: SortDirection
	initStatus?: ProductStatusOption
}

function setSort(sort: Sort, sortDirection: SortDirection) {
	if (sort === "price")
		return sortDirection === "ASC" ? "price_low_high" : "price_high_low"
	if (sort === "sells")
		return sortDirection === "ASC" ? "sells_low_high" : "sells_high_low"
	return sortDirection === "ASC" ? "created_old_new" : "created_new_old"
}

export function SpProductFilter({
	onSort,
	onStatusChange,
	onSearch,
	initSort = "createdAt",
	initSortDirection = "DESC",
	initStatus = "approved",
}: ProductFilterProps) {
	const sort = setSort(initSort, initSortDirection)
	const status = initStatus as ProductStatusOption

	const sortOptions: Record<ProductSortOption, string> = {
		price_high_low: "Price (High to Low)",
		price_low_high: "Price (Low to High)",
		sells_high_low: "Sells (High to Low)",
		sells_low_high: "Sells (Low to High)",
		created_new_old: "Created (New to Old)",
		created_old_new: "Created (Old to New)",
	}

	const statusOptions: Record<ProductStatusOption, string> = {
		// all: "All Prompts",
		draft: "Draft",
		declined: "Declined",
		approved: "Approved",
	}

	const handleSortChange = (value: ProductSortOption) => {
		const [option, direction] = value.split("_")
		onSort(
			option as "price" | "sells" | "createdAt",
			direction === "high" || direction === "new" ? "DESC" : "ASC",
		)
	}

	const handleStatusChange = (value: ProductStatusOption) => {
		onStatusChange(value)
	}

	return (
		<div className="flex w-full max-w-[1070px] flex-col items-start justify-between gap-4 bg-[#1B1818] py-4 sm:flex-row sm:items-center">
			<SpSearchBar onSearch={onSearch} />
			<div className="flex gap-2 sm:gap-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="flex h-11 items-center px-4 capitalize text-po-purple-50">
							{sortOptions[sort]}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-56 border-po-purple-50/25 bg-[#120F1E]"
						align="end">
						<DropdownMenuRadioGroup
							value={sort}
							onValueChange={(value) =>
								handleSortChange(value as ProductSortOption)
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

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="flex h-11 items-center px-4 capitalize text-po-purple-50">
							{statusOptions[status]}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-56 border-po-purple-50/25 bg-[#120F1E]"
						align="end">
						<DropdownMenuRadioGroup
							value={status}
							onValueChange={(value) =>
								handleStatusChange(value as ProductStatusOption)
							}>
							{Object.entries(statusOptions).map(([value, label]) => (
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
