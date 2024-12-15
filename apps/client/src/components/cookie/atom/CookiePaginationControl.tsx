import { ChevronLeft, ChevronRight } from "@repo/ui/lucide"
import { Button } from "@repo/ui/button"
import { cn } from "@/lib/utils.ts"

interface PaginationControlsProps {
	hasNext: boolean
	hasPrev: boolean // 이전 페이지 여부
	onPrevPage: () => void
	onNextPage: () => void
	className?: string
	total: number
	currentPage: number
	pageSize: number
	isFirstPage: boolean
}

export default function CookiePaginationControl({
	hasNext,
	hasPrev,
	onNextPage,
	onPrevPage,
	className,
	total,
	currentPage,
	pageSize,
	isFirstPage,
}: PaginationControlsProps) {
	const start = currentPage * pageSize + 1
	const end = Math.min((currentPage + 1) * pageSize, total)

	return (
		<div
			className={cn(
				"flex w-full max-w-[1070px] flex-col items-center justify-between gap-2 sm:flex-row",
				className,
			)}>
			<div className="text-sm text-white">Total {total}</div>

			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					className="flex items-center gap-2 text-[#E2ADFF] hover:bg-[#E2ADFF]/10 disabled:text-[#E2ADFF]/50 disabled:hover:bg-transparent"
					onClick={onPrevPage}
					disabled={isFirstPage || !hasPrev} // hasPrev가 false일 때 비활성화
				>
					<ChevronLeft className="h-4 w-4" />
					Prev
				</Button>

				<div className="flex h-10 items-center gap-2 px-4">
					<span className="text-sm text-[#E2ADFF]">
						{start}&nbsp;-&nbsp;{end}&nbsp;&nbsp;of&nbsp;&nbsp;
						{total}
					</span>
				</div>

				<Button
					variant="ghost"
					className="flex items-center gap-2 text-[#E2ADFF] hover:bg-[#E2ADFF]/10 disabled:text-[#E2ADFF]/50 disabled:hover:bg-transparent"
					onClick={onNextPage}
					disabled={!hasNext}>
					Next
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	)
}
