"use client"

import { useRouter, useSearchParams } from "next/navigation"
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
	const router = useRouter()
	const searchParams = useSearchParams()

	const [data, setData] = useState<GetCookieListResponseType>(initData)
	const [loading, setLoading] = useState(false)

	// 쿼리 파라미터 업데이트 함수
	const updateQueryParams = (params: Partial<GetCookieListRequestType>) => {
		const newParams = new URLSearchParams(searchParams.toString())
		Object.entries(params).forEach(([key, value]) => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- no problem
			if (value === undefined) {
				newParams.delete(key)
			} else {
				newParams.set(key, value.toString())
			}
		})

		router.push(`/account?${newParams.toString()}`)
	}

	// 정렬 변경 핸들러
	const handleSortChange = (paymentType: "USE" | "CHARGE" | undefined) => {
		updateQueryParams({ paymentType, lastId: undefined }) // 정렬 시 첫 페이지로 이동
	}

	// 다음 페이지 핸들러
	const handleNextPage = () => {
		updateQueryParams({ lastId: data.nextCursor || undefined }) // nextCursor를 사용해 다음 페이지 요청
	}

	// 이전 페이지 핸들러
	const handlePrevPage = () => {
		updateQueryParams({ lastId: undefined }) // 이전 페이지로 돌아감 (기본값)
	}

	// 페이지 변경 시 데이터 요청
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const request: GetCookieListRequestType = {
					...initRequest,
					paymentType:
						// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- no problem
						(searchParams.get("paymentType") as "USE" | "CHARGE") || undefined,
					lastId: searchParams.get("lastId") || undefined,
				}

				const response = await getCookieList(request)
				if (response.isSuccess) {
					setData(response.result)
				}
			} catch (error) {
				// eslint-disable-next-line no-console -- This is a server-side only log
				console.error("Failed to fetch data")
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [searchParams]) // URL 파라미터 변경 시 데이터 요청

	return (
		<div className="mx-auto w-full max-w-[1070px] px-4 sm:px-6 lg:px-8">
			<CookieFilter
				onSort={handleSortChange}
				initSort={initRequest.paymentType || "All"}
			/>

			{loading ? <p>Loading...</p> : <CookieTable cookies={data.content} />}

			<CookiePaginationControl
				className="mt-4"
				total={data.pageSize * (data.page + 1)} // 전체 데이터 수
				currentPage={data.page}
				pageSize={data.pageSize}
				hasNext={data.hasNext}
				hasPrev={Boolean(searchParams.get("lastId"))} // 이전 페이지 여부
				onPrevPage={handlePrevPage}
				onNextPage={handleNextPage}
				isFirstPage={!searchParams.get("lastId")}
			/>
		</div>
	)
}
