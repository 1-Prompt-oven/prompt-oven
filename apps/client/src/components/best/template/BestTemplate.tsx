"use client"

import React, { useState, useEffect } from "react"
import { ThreeDots } from "react-loader-spinner"
import type {
	BestCreatorCursorListTypes2,
	RenderedRankingItemTypes,
} from "@/types/best/bestTypes"
import BestList from "@/components/best/organism/BestList"
import BestTop5 from "@/components/best/organism/BestTop5"

interface BestTemplateProps {
	data: BestCreatorCursorListTypes2
}

function BestTemplate({ data }: BestTemplateProps) {
	const top5Data: RenderedRankingItemTypes[] = data.content.slice(0, 5)
	const restData: RenderedRankingItemTypes[] = data.content.slice(5)
	const pagingInfo = {
		nextCursor: data.nextCursor,
		hasNext: data.hasNext,
		pageSize: data.pageSize,
		page: data.page,
	}

	const [isLoading, setIsLoading] = useState(true)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
		}
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const preloadImages = async (imageData: RenderedRankingItemTypes[]) => {
		const imagePromises = imageData.map((item) => {
			return new Promise<void>((resolve) => {
				const img = new Image()
				img.src = item.avatarImage
				img.onload = () => resolve()
				img.onerror = () => resolve()
			})
		})
		await Promise.all(imagePromises)
	}

	useEffect(() => {
		const preloadAllImages = async () => {
			await preloadImages(data.content)
			setIsLoading(false)
		}
		preloadAllImages()
	}, [data.content])

	return (
		<>
			{isLoading ? (
				<div className="flex min-h-screen flex-col items-center justify-center">
					<ThreeDots
						visible
						height="80"
						width="80"
						color="#A913F9"
						radius="9"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
					<span className="text-xl font-medium leading-[150%] text-white">
						Loading...
					</span>
				</div>
			) : (
				<>
					{isMobile ? (
						<div>
							<div className="mb-3 mt-10">
								<h1 className="text-center text-3xl font-bold text-white">
									Best Creators
								</h1>
							</div>
							<BestTop5 data={top5Data} />
							<BestList data={restData} pagingInfo={pagingInfo} />
						</div>
					) : (
						<>
							<div className="mb-3 mt-10">
								<h1 className="ml-[100px] text-left text-5xl font-bold text-white">
									Best Creators
								</h1>
							</div>
							<BestTop5 data={top5Data} />
							<BestList data={restData} pagingInfo={pagingInfo} />
						</>
					)}
				</>
			)}
		</>
	)
}

export default BestTemplate

