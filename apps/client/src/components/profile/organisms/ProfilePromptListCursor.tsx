// "use client"

// import React, { useState, useEffect } from "react"
// import ProfilePromptItem from "../molecules/ProfilePromptItem"
// import ProfileLoadMore from "../molecules/ProfileLoadMore"
// import { getProfileList } from "@/action/profile/getProfileData"

// interface ProfileListProps {
// 	initialData: {
// 		items: PromptsType[] // 초기 데이터
// 		nextCursor: string | null // 다음 커서
// 	}
// }

// export default function ProfilePromptListCursor({
// 	initialData,
// }: ProfileListProps) {
// 	const [allData, setAllData] = useState<PromptsType[]>(
// 		initialData.items,
// 	)
// 	const [loading, setLoading] = useState(false)
// 	const [hasMore, setHasMore] = useState(true)
// 	const [cursor, setCursor] = useState<string | null>(initialData.nextCursor) // 초기 커서 설정
// 	const [visibleCount, setVisibleCount] = useState(4) // 표시할 항목 수

// 	// 데이터 로드 함수
// 	const loadMoreData = async () => {
// 		if (loading || !hasMore) return // 로딩 중이거나 더 이상 데이터가 없으면 리턴

// 		setLoading(true)
// 		try {
// 			const response = await getProfileList(cursor ? cursor : "0")

// 			const { items, nextCursor } = response // 응답에서 데이터와 다음 커서 받기
// 			setAllData((prev) => [...prev, ...items]) // 기존 데이터에 추가
// 			setCursor(nextCursor) // 다음 커서 업데이트
// 			setHasMore(nextCursor !== null) // 더 이상 데이터가 없으면 false
// 		} catch (error) {
// 			error
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	const handleLoadMoreClick = () => {
// 		setVisibleCount((prev) => prev + 4) // 더 보기 클릭 시 표시할 항목 수 증가
// 		loadMoreData() // 데이터 로드
// 	}

// 	return (
// 		<>
// 			<div className="grid grid-cols-2 gap-8 xl:grid-cols-3 2xl:grid-cols-4">
// 				{allData.slice(0, visibleCount).map(
// 					(
// 						item, // 현재 표시할 데이터만 잘라서 사용
// 					) => (
// 						<ProfilePromptItem key={item.productUuID} productInfo={item} />
// 					),
// 				)}
// 				{allData.length === 0 && <div>No data available</div>}
// 			</div>
// 			{hasMore && (
// 				<ProfileLoadMore onClick={handleLoadMoreClick} loading={loading} />
// 			)}
// 		</>
// 	)
// }

// // import React from "react"
// // import ProfilePromptItem from "../molecules/ProfilePromptItem"
// // import ProfileLoadMore from "../molecules/ProfileLoadMore"

// // interface ProfileListProps {
// // 	listData: PromptsType[]
// // }

// // export default function ProfilePromptList({ listData }: ProfileListProps) {
// // 	return (
// // 		<>
// // 			<div className="grid grid-cols-2 gap-8 xl:grid-cols-3 2xl:grid-cols-4">
// // 				{listData.length > 0
// // 					? listData.map((item) => (
// // 							<ProfilePromptItem key={item.productUuID} productInfo={item} />
// // 						))
// // 					: null}
// // 			</div>
// // 			<ProfileLoadMore />
// // 		</>
// // 	)
// // }
