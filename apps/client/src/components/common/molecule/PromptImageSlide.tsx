"use client"

import React, { useCallback, useEffect, useState } from "react"
import type { PanInfo } from "framer-motion"
import { AnimatePresence, motion, useDragControls } from "framer-motion"
import type { PromptDetailContentsType } from "@/types/prompt-detail/promptDetailType"

const SLIDE_DURATION = 10000 // 10 seconds
const DRAG_THRESHOLD = 50 // Minimum drag distance to trigger slide change

interface PromptImageSlideProps {
	images: PromptDetailContentsType[]
}

export default function PromptImageSlide({ images }: PromptImageSlideProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(0)
	const [isHovered, setIsHovered] = useState(false)
	const dragControls = useDragControls()

	const nextSlide = useCallback(() => {
		setDirection(1)
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
	}, [images.length])

	const prevSlide = useCallback(() => {
		setDirection(-1)
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length,
		)
	}, [images.length])

	useEffect(() => {
		// eslint-disable-next-line no-undef -- NodeJS.Timeout is a Node.js global
		let timer: NodeJS.Timeout | null = null
		if (!isHovered) {
			timer = setInterval(() => {
				nextSlide()
			}, SLIDE_DURATION)
		}
		return () => {
			if (timer) clearInterval(timer)
		}
	}, [nextSlide, isHovered])

	const handleMouseEnter = () => setIsHovered(true)
	const handleMouseLeave = () => setIsHovered(false)

	const handleDragEnd = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
	) => {
		const { offset, velocity } = info
		if (Math.abs(offset.x) > DRAG_THRESHOLD || Math.abs(velocity.x) > 500) {
			if (offset.x > 0) {
				prevSlide()
			} else {
				nextSlide()
			}
		}
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
		<div
			className="relative h-full w-full"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div className="absolute inset-0 z-[1] flex flex-col gap-2 overflow-hidden rounded-lg bg-[#131313]">
				<AnimatePresence initial={false} custom={direction}>
					<motion.img
						key={currentIndex}
						src={images[currentIndex].contentUrl}
						alt={images[currentIndex].contentUrl}
						className="absolute h-[93%] w-full rounded-lg object-cover"
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
						drag="x"
						dragControls={dragControls}
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={1}
						onDragEnd={handleDragEnd}
					/>
				</AnimatePresence>
				<div className="absolute bottom-4 hidden w-full justify-center space-x-4 xs:!flex">
					{images.map((button, index) => (
						<button
							type="button"
							key={button.contentUrl}
							className={`h-2.5 w-2.5 rounded-full ${
								index === currentIndex
									? "border border-[#FCB808]"
									: "bg-[#424242]"
							}`}
							onClick={() => {
								setDirection(index > currentIndex ? 1 : -1)
								setCurrentIndex(index)
							}}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
