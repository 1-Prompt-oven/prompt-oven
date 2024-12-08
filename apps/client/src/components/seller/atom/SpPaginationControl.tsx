import { ChevronLeft, ChevronRight } from "@repo/ui/lucide"
import { Button } from "@repo/ui/button"
import { cn } from "@/lib/utils.ts"

interface PaginationControlsProps {
	hasNext: boolean
	isFirstPage: boolean
	onPrevPage: () => void
	onNextPage: () => void
	className?: string
}

export default function SpPaginationControls({
	hasNext,
	onNextPage,
	onPrevPage,
	isFirstPage,
	className,
}: PaginationControlsProps) {
	return (
		<div
			className={cn(
				"flex w-full max-w-[1070px] items-center justify-end gap-2",
				className,
			)}>
			<div className="flex">
				<Button
					variant="ghost"
					className="flex items-center gap-2 text-[#E2ADFF] hover:bg-[#E2ADFF]/10 disabled:text-[#E2ADFF]/50 disabled:hover:bg-transparent"
					onClick={onPrevPage}
					disabled={isFirstPage}>
					<ChevronLeft className="h-4 w-4" />
					Prev
				</Button>

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
