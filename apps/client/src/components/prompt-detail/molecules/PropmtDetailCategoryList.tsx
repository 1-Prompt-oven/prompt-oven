"use client"

import { ChevronLeft, ChevronRight } from "@repo/ui/lucide"
import PropmtDetailCategoryItem from "../atoms/PropmtDetailCategoryItem"

interface PropmtDetailCategoryListProps {
	categories: { title: string; images: string[] }[]
}

// todo - API 적용 시, 무한스크롤 기능이 구현되어야 함. 그에 따른 로직 수정 필요.
export default function PropmtDetailCategoryList({
	categories,
}: PropmtDetailCategoryListProps) {
	// Constants for calculations
	const ITEMS_PER_SCROLL = 4
	const ITEM_WIDTH = 340 // Width of each item
	const ITEM_GAP = 20 // Gap between items
	const SCROLL_DISTANCE = ITEMS_PER_SCROLL * (ITEM_WIDTH + ITEM_GAP)

	const scrollLeft = () => {
		const container = document.getElementById("category-container")
		if (container) {
			container.scrollBy({ left: -SCROLL_DISTANCE, behavior: "smooth" })
		}
	}

	const scrollRight = () => {
		const container = document.getElementById("category-container")
		if (container) {
			container.scrollBy({ left: SCROLL_DISTANCE, behavior: "smooth" })
		}
	}

	return (
		<div className="mx-auto w-full max-w-[1420px]">
			<div className="mb-8 flex items-center justify-between">
				<h2 className="font-sora text-[38px] font-semibold text-white">
					Browse by category
				</h2>
				<div className="flex space-x-6">
					<button
						type="button"
						onClick={scrollLeft}
						className="group flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#424242] bg-[#111111] hover:border-[#DDA2FE] hover:bg-[#111111] focus:outline-none">
						<ChevronLeft className="h-5 w-5 text-[#969696] group-hover:text-[#DDA2FE]" />
					</button>
					<button
						type="button"
						onClick={scrollRight}
						className="group flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#424242] bg-[#111111] hover:border-[#DDA2FE] hover:bg-[#111111] focus:outline-none">
						<ChevronRight className="h-5 w-5 text-[#969696] group-hover:text-[#DDA2FE]" />
					</button>
				</div>
			</div>

			<div
				id="category-container"
				className="scrollbar-hide overflow-x-auto"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
				}}>
				<div className="flex gap-5 pb-4">
					{categories.map((category, index) => (
						// eslint-disable-next-line react/no-array-index-key -- index is unique
						<div key={`${category.title}-${index}`} className="flex-none">
							<PropmtDetailCategoryItem {...category} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
