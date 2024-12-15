"use client"

import { useEffect, useRef, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { fetchRankingList } from "@/action/best/getBestData"
import type { RenderedRankingItemTypes } from "@/types/best/bestTypes"
import { BestCreatorListItem } from "@/components/best/molecule/BestCreatorListItem"

interface BestListProps<T> {
	data: T[]
	pagingInfo: {
		nextCursor: number
		hasNext: boolean
		pageSize: number
		page: number
	}
}

function BestList({
	data,
	pagingInfo,
}: BestListProps<RenderedRankingItemTypes>) {
	const [list, setList] = useState<RenderedRankingItemTypes[]>(data)
	const [loading, setLoading] = useState(false)
	const [hasNext, setHasNext] = useState<boolean>(pagingInfo.hasNext)
	const [nextCursor, setNextCursor] = useState<number | null>(
		pagingInfo.nextCursor,
	)
	const observerRef = useRef<HTMLDivElement | null>(null)

	const fetchMoreData = async () => {
		if (loading || !hasNext || !nextCursor) return
		setLoading(true)
		try {
			const newCreators = await fetchRankingList({
				lastRanking: nextCursor,
				date: data[0].date,
			})
			const imagePromises = newCreators.content.map((creator) => {
				return new Promise((resolve) => {
					const img = new Image()
					img.src = creator.avatarImage
					img.onload = resolve
					img.onerror = resolve
				})
			})
			await Promise.all(imagePromises) // 모든 이미지 로딩 완료 대기
			setHasNext(newCreators.hasNext)
			setNextCursor(newCreators.nextCursor)
			setList((prevList) => [...prevList, ...newCreators.content])
		} catch (error) {
			// eslint-disable-next-line no-console -- Error to Fetching
			console.error("크리에이터를 불러오는 중 오류 발생:", error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const observer = new IntersectionObserver(
			async (entries) => {
				if (entries[0].isIntersecting && !loading && hasNext && nextCursor) {
					await fetchMoreData()
					const scrollY = window.scrollY
					const windowHeight = window.innerHeight
					const newScrollY = scrollY + windowHeight / 2
					window.scrollTo({ top: newScrollY, behavior: "smooth" })
				}
			},
			{ threshold: 1 },
		)

		const currentObserver = observerRef.current
		if (currentObserver) {
			observer.observe(currentObserver)
		}

		return () => {
			if (currentObserver) observer.unobserve(currentObserver)
		}
	}, [loading, hasNext, nextCursor])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className="mx-auto w-full max-w-[1716px]">
			<div>
				<div className="grid grid-cols-12 gap-5 px-6 py-4 text-lg font-semibold text-white">
					<div className="col-span-2">Rank</div>
					<div className="col-span-3">Creator&apos;s Name</div>
					<div className="col-span-2">Creator&apos;s Tag</div>
					<div className="col-span-1 text-right">Daily Sales</div>
					<div className="col-span-2 text-right">Avg Star</div>
					<div className="col-span-2 text-right">Followers</div>
					{/* <div className="flex items-center">
						<span>Total Sales</span>
					</div> */}
				</div>
				<div className="h-1 w-full bg-rose-200" />
			</div>
			{list.map((creator) => (
				<BestCreatorListItem
					_date={creator.date}
					_views={0}
					key={creator.memberUuid}
					{...creator}
				/>
			))}
			{loading ? (
				<div className="mb-8 flex flex-col items-center justify-center">
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
			) : null}
			{!hasNext ? (
				<div className="mb-8 p-4 text-center text-white">
					<span className="font-bold">END</span>
				</div>
			) : null}

			{hasNext && nextCursor ? (
				<div ref={observerRef} className="h-[1px] w-full" />
			) : null}
		</div>
	)
}

export default BestList

