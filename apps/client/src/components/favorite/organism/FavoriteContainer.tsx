"use client"

import { useEffect, useRef, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { getFavoriteList } from "@/action/favorite/getFavoritesData"
import type { PromptItemType, PromptsType } from "@/types/prompts/promptsType"
import FavoriteList from "../molecule/FavoriteList"
import FavoriteResultBar from "../molecule/FavoriteCountBar"

interface FavoriteContainerProps {
	favoriteList: PromptsType
}

export default function FavoriteContainer({
	favoriteList,
}: FavoriteContainerProps) {
	const [list, setList] = useState<PromptItemType[]>(favoriteList.productList)
	const [loading, setLoading] = useState(false)
	const [hasNext, setHasNext] = useState<boolean>(favoriteList.hasNext)
	const [cursorId, setCursorId] = useState<string | null>(
		favoriteList.nextCursorId,
	)

	const observerRef = useRef<HTMLDivElement | null>(null)

	const fetchMoreProducts = () => {
		if (loading || !favoriteList.hasNext || !cursorId) return

		setLoading(true)
		getFavoriteList(cursorId)
			.then((newProducts) => {
				setHasNext(newProducts.hasNext)
				setCursorId(newProducts.nextCursorId)
				setList((prevList) => [...prevList, ...newProducts.productList])
			})
			.catch((error) => {
				// eslint-disable-next-line no-console -- Error to Fetching
				console.error("상품을 불러오는 중 오류 발생:", error)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	useEffect(() => {
		const observer = new IntersectionObserver(
			async (entries) => {
				if (entries[0].isIntersecting && !loading && hasNext && cursorId) {
					await fetchMoreProducts() // 비동기 작업이 완료될 때까지 기다림

					// 데이터 로드가 성공적으로 완료된 후 스크롤 위치를 중앙으로 설정
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
	}, [loading, hasNext, cursorId])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className="flex flex-col gap-8">
			<FavoriteResultBar />
			<div className="mx-7 mb-16 flex flex-col gap-8 md:!flex-row">
				<FavoriteList favoriteList={list} />
			</div>

			{/* 로딩 표시 */}
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

			{/* 더 이상 불러올 데이터가 없으면 표시 */}
			{!hasNext && favoriteList.productList.length > 0 ? (
				<div className="mb-8 p-4 text-center text-white">
					<span className="font-bold">END</span>
				</div>
			) : null}

			{/* 스크롤 감지용 */}
			{hasNext && cursorId ? (
				<div ref={observerRef} className="h-[1px] w-full" />
			) : null}
		</div>
	)
}
