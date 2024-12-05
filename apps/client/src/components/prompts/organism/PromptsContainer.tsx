"use client"

import { useState } from "react"
import { getPromptList } from "@/action/prompts/getPromptsData"
import type { CategoryType } from "@/types/prompts/categoryType"
import type { PromptItemType } from "@/types/prompts/promptsType"
import PromptsFilterSidebar from "../molecule/PromptsFilterSidebar"
import PromptsItemFilter from "../molecule/PromptsItemFilter"
import PromptList from "../molecule/PromptList"

interface PromptsTemplateProps {
	promptList: PromptItemType[]
	categoryList: CategoryType[]
}

export default function PromptsContainer({
	promptList,
	categoryList,
}: PromptsTemplateProps) {
	const [list, setList] = useState<PromptItemType[]>(promptList)
	const [allForm, setAllForm] = useState<FormData>(new FormData())

	// const [pageNo, setPageNo] = useState(1)
	// const [loading, setLoading] = useState(false)
	// const [hasMore, setHasMore] = useState(true)
	// const observerRef = useRef<HTMLDivElement | null>(null)

	// useEffect(() => {
	// 	const observer = new IntersectionObserver(
	// 		(entries) => {
	// 			if (entries[0].isIntersecting && !loading && hasMore) {
	// 				fetchMoreProducts()
	// 			}
	// 		},
	// 		{ threshold: 1 },
	// 	)

	// 	const currentObserver = observerRef.current
	// 	if (currentObserver) {
	// 		observer.observe(currentObserver)
	// 	}

	// 	return () => {
	// 		if (currentObserver) observer.unobserve(currentObserver)
	// 	}
	// }, [loading, hasMore])

	// const fetchMoreProducts = () => {
	// 	if (loading || !hasMore) return

	// 	setLoading(true)
	// 	getProductCodeList(categoryCode, pageNo + 1)
	// 		.then((newProducts) => {
	// 			if (newProducts.length === 0) {
	// 				setHasMore(false)
	// 			} else {
	// 				setProductCodeList((prevList) => [...prevList, ...newProducts])
	// 				setPageNo((prevPageNo) => prevPageNo + 1)
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.error("상품을 불러오는 중 오류 발생:", error)
	// 		})
	// 		.finally(() => {
	// 			setLoading(false)
	// 		})
	// }

	const handleFilter = async (filterFormData: FormData) => {
		setAllForm(filterFormData)
		const updateList = await getPromptList(allForm)
		setList(updateList.productList)
	}

	return (
		<form action={handleFilter}>
			<div className="mx-12 mb-16 flex flex-col gap-8 md:!flex-row">
				<PromptsFilterSidebar categoryList={categoryList} />
				<div className="flex w-full flex-col gap-8">
					<PromptsItemFilter
						promptCount={promptList.length}
						handleFilter={handleFilter}
						allForm={allForm}
					/>
					<PromptList promptList={list} />
				</div>
			</div>

			{/* 로딩 표시 */}
			{/* {loading && <div className="p-4 text-center">LOADING...</div>} */}

			{/* 더 이상 불러올 데이터가 없으면 표시 */}
			{/* {!hasMore && (
				<div className="p-4 text-center">상품이 존재하지 않습니다.</div>
			)} */}

			{/* 스크롤 감지용 */}
			{/* <div ref={observerRef} className="h-[1px] w-full"></div> */}
		</form>
	)
}
