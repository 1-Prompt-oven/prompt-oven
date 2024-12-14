"use client"

import React, { useCallback, useEffect, useState } from "react"
import type { PanInfo } from "framer-motion"
import { AnimatePresence, motion, useDragControls } from "framer-motion"

const SLIDE_DURATION = 5000 // 5 seconds
const DRAG_THRESHOLD = 50 // Minimum drag distance to trigger slide change

interface ImageCarouselProps {
	images: {
		id?: string
		src: string
		alt: string
		title: string
		creator: string
		mainDesc?: string
		subDesc?: string
	}[]
	changeCallbackFn?: (index: number) => void
}

export default function ImageCarousel({
	images,
	changeCallbackFn,
}: ImageCarouselProps) {
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
		if (changeCallbackFn) {
			changeCallbackFn(currentIndex)
		}
	}, [currentIndex, changeCallbackFn])

	useEffect(() => {
		// eslint-disable-next-line no-undef -- ok
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
				x: _direction > 0 ? "100%" : "-100%",
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
				x: _direction < 0 ? "100%" : "-100%",
				opacity: 0,
			}
		},
	}

	return (
		<div className="mx-auto w-full min-w-[400px] max-w-[660px]">
			<div
				className="relative w-full pb-[100%]"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}>
				{/* Tilted pink rectangle */}
				<div
					className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#A913F9] to-[#F913C4]"
					style={{
						transform: "rotate(-3.98deg)",
						zIndex: 0,
					}}
				/>

				{/* Main content */}
				<div className="absolute inset-0 z-[1] overflow-hidden rounded-lg bg-[#161616]">
					<AnimatePresence initial={false} custom={direction}>
						<motion.img
							key={currentIndex}
							src={images[currentIndex].src}
							alt={images[currentIndex].alt}
							className="absolute h-[calc(100%-130px)] w-[calc(100%-50px)] rounded-lg object-cover"
							style={{
								top: "25px",
								left: "25px",
							}}
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
					<div className="absolute bottom-7 left-5 right-5 flex flex-col items-start justify-between sm:flex-row sm:items-center">
						<div>
							<h2 className="font-sora text-lg font-semibold text-white sm:text-xl lg:text-2xl">
								{images[currentIndex].title}
							</h2>
							<div className="mt-2 flex items-center sm:mt-3">
								<div className="mr-3 h-7 w-7 rounded-full bg-[#C4C4C4] sm:h-9 sm:w-9" />
								<span className="font-roboto text-sm font-medium text-white sm:text-base lg:text-lg">
									{images[currentIndex].creator}
								</span>
							</div>
						</div>
						<div className="mt-2 flex space-x-2 sm:mt-0 sm:space-x-4">
							{images.map((button, index) => (
								<button
									type="button"
									key={button.title}
									className={`h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5 ${
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
			</div>
		</div>
	)
}
