"use client"

import { useState, useEffect } from "react"
import type {
	GetCookieListRequestType,
	GetCookieListResponseType,
} from "@/types/cookie/cookieResponseType"
import { getCookieList } from "@/action/cookie/cookieAction"
import CookieTable from "../atom/CookieTable"
import CookiePaginationControl from "../atom/CookiePaginationControl"
import { CookieFilter } from "./CookieFilter"

interface CookieHistoryProps {
	initData: GetCookieListResponseType // 초기 데이터
	initRequest: GetCookieListRequestType // 초기 요청 값
}

export default function CookieHistory({
	initData,
	initRequest,
}: CookieHistoryProps) {
	// 상태 관리
	const [request, setRequest] = useState<GetCookieListRequestType>(initRequest) // 요청 상태
	const [data, setData] = useState<GetCookieListResponseType>(initData) // 데이터 상태
	const [cursorHistory, setCursorHistory] = useState<string[]>([])
	const [loading, setLoading] = useState(false)
	// 데이터 요청
	const fetchData = async () => {
		setLoading(true)
		try {
			const response = await getCookieList(request)
			if (response.isSuccess) {
				setData(response.result)
			}
		} catch (error) {
			// eslint-disable-next-line no-console -- This is a error
			console.error("Try again")
		} finally {
			setLoading(false)
		}
	}

	const handlePrevPage = () => {
		if (cursorHistory.length > 0) {
			const prevCursor = cursorHistory[cursorHistory.length - 1] // 마지막 기록 커서 가져오기
			setCursorHistory((prev) => prev.slice(0, -1)) // 기록에서 마지막 커서 제거
			setRequest((prev) => ({
				...prev,
				lastId: prevCursor || undefined, // 이전 커서 설정
			}))
		}
	}

	// 다음 페이지 핸들러
	const handleNextPage = () => {
		if (data.hasNext && data.nextCursor) {
			setCursorHistory((prev) => [...prev, request.lastId || ""]) // 현재 커서를 기록
			setRequest((prev) => ({
				...prev,
				lastId: data.nextCursor, // 다음 커서 설정
			}))
		}
	}
	// 정렬 변경 핸들러
	const handleSortChange = (paymentType: "USE" | "CHARGE" | undefined) => {
		setRequest({
			...initRequest,
			paymentType,
			lastId: undefined, // 첫 페이지로 초기화
		})
	}

	// 요청 상태가 변경되면 데이터 요청
	useEffect(() => {
		fetchData()
	}, [request])

	return (
		<div className="mx-auto w-full max-w-[1070px] px-4 sm:px-6 lg:px-8">
			<CookieFilter
				onSort={handleSortChange}
				initSort={initRequest.paymentType || "USE"}
				initSortDirection="DESC"
			/>
			{loading ? <p>Loading...</p> : <CookieTable cookies={data.content} />}

			<CookiePaginationControl
				className="mt-4"
				total={data.pageSize * (data.page + 1)} // 전체 데이터 수 가정
				currentPage={data.page}
				pageSize={data.pageSize}
				hasNext={data.hasNext}
				hasPrev={cursorHistory.length > 0} // 이전 페이지 여부
				onPrevPage={handlePrevPage} // 이전 페이지 요청
				onNextPage={handleNextPage} // 다음 페이지 요청
				isFirstPage={data.page === 0}
			/>
		</div>
	)
}
