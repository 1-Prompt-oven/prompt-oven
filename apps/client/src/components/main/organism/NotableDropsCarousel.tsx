"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "@repo/ui/lucide"
import { Button } from "@repo/ui/button"
import NotableDrop from "@/components/main/molecule/NotableDrop.tsx"

interface NotableDropsCarouselProps {
	items: {
		title: string
		description: string
		tag: string
		bgImage: string
		author: {
			name: string
			profile: string
		}
	}[]
}

function NotableDropsCarousel({ items }: NotableDropsCarouselProps) {
	const [currentPage, setCurrentPage] = useState(0)
	const [direction, setDirection] = useState(0)
	const totalPages = Math.ceil(items.length / 3)

	const paginate = (newDirection: number) => {
		setDirection(newDirection)
		setCurrentPage((prevPage) => {
			let nextPage = prevPage + newDirection
			if (nextPage < 0) nextPage = totalPages - 1
			if (nextPage >= totalPages) nextPage = 0
			return nextPage
		})
	}

	const goToPage = (pageIndex: number) => {
		setDirection(pageIndex > currentPage ? 1 : -1)
		setCurrentPage(pageIndex)
	}

	const variants = {
		enter: (_direction: number) => {
			return {
				x: _direction > 0 ? 1500 : -1500,
				opacity: 0,
			}
		},
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (_direction: number) => {
			return {
				zIndex: 0,
				x: _direction < 0 ? 1500 : -1500,
				opacity: 0,
			}
		},
	}

	// todo -- 추후에 반응형 디자인이 나오면 반응형 작업 진행하기 (현재는 고정값)
	return (
		<div className="relative mx-auto w-full max-w-[1420px]">
			{/* upper part */}
			<div className="mb-[30px] flex items-center justify-between">
				<h2 className="text-4xl font-bold text-white">Notable drops</h2>
				<div className="flex gap-x-6">
					{/* note - 중복되는 코드가 늘어나면 컴포넌트로 뺴거나 variant로 관리하기 */}
					<Button
						type="button"
						onClick={() => paginate(-1)}
						className="group flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#424242] bg-[#111111] hover:border-[#DDA2FE] hover:bg-[#111111] focus:outline-none">
						<ChevronLeft className="h-5 w-5 text-[#969696] group-hover:text-[#DDA2FE]" />
					</Button>
					<Button
						type="button"
						onClick={() => paginate(1)}
						className="group flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#424242] bg-[#111111] hover:border-[#DDA2FE] hover:bg-[#111111] focus:outline-none">
						<ChevronRight className="h-5 w-5 text-[#969696] group-hover:text-[#DDA2FE]" />
					</Button>
				</div>
			</div>

			{/* lower part */}
			<div className="relative h-[600px] overflow-hidden">
				<AnimatePresence initial={false} custom={direction}>
					<motion.div
						key={currentPage}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
						className="absolute h-full w-full">
						<div className="flex justify-between space-x-5">
							{items
								.slice(currentPage * 3, currentPage * 3 + 3)
								.map((item, index) => (
									<NotableDrop
										// eslint-disable-next-line react/no-array-index-key -- index is unique
										key={index}
										title={item.title}
										author={item.author}
										tag={item.tag}
										description={item.description}
										bgImage={item.bgImage}
									/>
								))}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
			<div className="mt-8 flex justify-center space-x-5">
				{Array.from({ length: totalPages }).map((_, index) => (
					<Button
						type="button"
						// eslint-disable-next-line react/no-array-index-key -- index is unique
						key={index}
						onClick={() => goToPage(index)}
						className={`box-border h-[10px] w-[10px] rounded-full p-0 ${
							index === currentPage
								? "border border-[#DDA2FE] bg-[#111111]"
								: "bg-[#424242]"
						} transition-colors duration-200 ease-in-out hover:bg-[#DDA2FE] focus:outline-none`}
						aria-label={`Go to page ${index + 1}`}
					/>
				))}
			</div>
		</div>
	)
}

export default NotableDropsCarousel
