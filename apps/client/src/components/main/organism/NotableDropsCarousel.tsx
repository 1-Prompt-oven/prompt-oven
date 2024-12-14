"use client"

import React, { useEffect, useState } from "react"
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
	const [itemsPerPage, setItemsPerPage] = useState(3)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) {
				setItemsPerPage(1)
			} else if (window.innerWidth < 1024) {
				setItemsPerPage(2)
			} else {
				setItemsPerPage(3)
			}
		}

		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const totalPages = Math.ceil(items.length / itemsPerPage)

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
				x: _direction > 0 ? 1000 : -1000,
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
				x: _direction < 0 ? 1000 : -1000,
				opacity: 0,
			}
		},
	}

	return (
		<div className="relative mx-auto w-full max-w-[1420px] px-4 sm:px-6 lg:px-8">
			{/* upper part */}
			<div className="mb-4 flex flex-col items-start justify-between space-y-4 sm:mb-6 sm:flex-row sm:items-center sm:space-y-0 md:mb-[30px]">
				<h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
					Notable drops
				</h2>
				<div className="flex gap-x-4 sm:gap-x-6">
					<Button
						type="button"
						onClick={() => paginate(-1)}
						className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#424242] bg-[#111111] hover:border-[#DDA2FE] hover:bg-[#111111] focus:outline-none sm:h-12 sm:w-12 md:h-[50px] md:w-[50px]">
						<ChevronLeft className="h-4 w-4 text-[#969696] group-hover:text-[#DDA2FE] sm:h-5 sm:w-5" />
					</Button>
					<Button
						type="button"
						onClick={() => paginate(1)}
						className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#424242] bg-[#111111] hover:border-[#DDA2FE] hover:bg-[#111111] focus:outline-none sm:h-12 sm:w-12 md:h-[50px] md:w-[50px]">
						<ChevronRight className="h-4 w-4 text-[#969696] group-hover:text-[#DDA2FE] sm:h-5 sm:w-5" />
					</Button>
				</div>
			</div>

			{/* lower part */}
			<div className="relative h-[400px] overflow-hidden sm:h-[500px] md:h-[600px]">
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
						<div className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{items
								.slice(
									currentPage * itemsPerPage,
									currentPage * itemsPerPage + itemsPerPage,
								)
								.map((item, index) => (
									<NotableDrop
										// eslint-disable-next-line react/no-array-index-key -- index is unique
										key={`${currentPage}-${index}`}
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
			<div className="mt-4 flex justify-center space-x-2 sm:mt-6 sm:space-x-3 md:mt-8 md:space-x-5">
				{Array.from({ length: totalPages }).map((_, index) => (
					<Button
						type="button"
						// eslint-disable-next-line react/no-array-index-key -- index is unique
						key={index}
						onClick={() => goToPage(index)}
						className={`box-border h-2 w-2 rounded-full p-0 sm:h-3 sm:w-3 md:h-[10px] md:w-[10px] ${
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
