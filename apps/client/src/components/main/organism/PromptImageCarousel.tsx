"use client"

import React, { useState } from "react"
import { Button } from "@repo/ui/button"
import Link from "next/link"
import ImageCarousel from "@/components/main/molecule/ImageCarousel.tsx"
import type { NotableProductWithAuthor } from "@/types/product/productUpsertType.ts"

interface PromptImageCarouselProps {
	items: NotableProductWithAuthor[]
}

function PromptImageCarousel({ items }: PromptImageCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const changeCallbackFnHandler = (index: number) => {
		setCurrentIndex(index)
	}

	return (
		<div className="flex w-full flex-col items-center justify-center gap-8 px-4 py-10 sm:!px-10 md:!px-14 lg:!flex-row lg:!gap-[100px] lg:!px-20 lg:!py-20 xl:!px-28">
			<div className="w-full max-w-[660px]">
				<ImageCarousel
					items={items}
					changeCallbackFn={changeCallbackFnHandler}
				/>
			</div>

			<div className="mt-8 w-full max-w-[724px] lg:!mt-0">
				<h1 className="mb-4 font-sora text-3xl font-semibold leading-tight text-white sm:!text-4xl lg:!mb-6 lg:!text-[55px] lg:!leading-[64px]">
					{items[currentIndex].productName}
				</h1>

				<p className="mb-6 font-sora text-base leading-normal text-[#969696] sm:!text-lg lg:!mb-8 lg:!text-[19px] lg:!leading-[28px]">
					{items[currentIndex].description}
				</p>

				<div className="flex flex-col gap-4 sm:!flex-row">
					<Link href={`/prompt-detail/${items[currentIndex].productUuid}`}>
						<Button className="h-12 w-full bg-gradient-to-r from-[#A913F9] to-[#3F5EFB] font-sora text-sm font-semibold sm:!h-[50px] sm:!w-[152px] sm:!text-[15px]">
							View Detail
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default PromptImageCarousel
