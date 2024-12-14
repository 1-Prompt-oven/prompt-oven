"use client"

import React, { useState } from "react"
import { Button } from "@repo/ui/button"
import ImageCarousel from "@/components/main/molecule/ImageCarousel.tsx"

interface PromptImageCarouselProps {
	images: {
		id?: string
		src: string
		alt: string
		title: string
		creator: string
		mainDesc?: string
		subDesc?: string
	}[]
}

function PromptImageCarousel({ images }: PromptImageCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const changeCallbackFnHandler = (index: number) => {
		setCurrentIndex(index)
	}

	return (
		<div className="flex w-full flex-col items-center justify-center gap-8 px-4 py-10 sm:!px-8 md:!px-12 lg:!flex-row lg:!gap-[100px] lg:!px-16 lg:!py-20 xl:!px-24">
			<div className="w-full max-w-[660px]">
				<ImageCarousel
					images={images}
					changeCallbackFn={changeCallbackFnHandler}
				/>
			</div>

			<div className="mt-8 w-full max-w-[724px] lg:!mt-0">
				<h1 className="mb-4 font-sora text-3xl font-semibold leading-tight text-white sm:!text-4xl lg:!mb-6 lg:!text-[55px] lg:!leading-[64px]">
					{images[currentIndex].mainDesc}
				</h1>

				<p className="mb-6 font-sora text-base leading-normal text-[#969696] sm:!text-lg lg:!mb-8 lg:!text-[19px] lg:!leading-[28px]">
					{images[currentIndex].subDesc}
				</p>

				<div className="flex flex-col gap-4 sm:!flex-row">
					<Button className="h-12 w-full bg-gradient-to-r from-[#A913F9] to-[#3F5EFB] font-sora text-sm font-semibold sm:!h-[50px] sm:!w-[152px] sm:!text-[15px]">
						ADD CART
					</Button>
					<Button
						variant="outline"
						className="h-12 w-full border-[#424242] bg-[#111111] font-sora text-sm font-semibold text-white sm:!h-[50px] sm:!w-[118px] sm:!text-[15px]">
						Share
					</Button>
				</div>
			</div>
		</div>
	)
}

export default PromptImageCarousel
