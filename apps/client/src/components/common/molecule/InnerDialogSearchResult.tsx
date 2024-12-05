"use client"
import React, { useCallback, useEffect, useState } from "react"
import debounce from "lodash/debounce"
import { fetchSearchResults } from "@/action/search/searchAction"
import type { PromptApiResponseType } from "@/types/common/responseType"
import type { ProfileForSearchListType } from "@/types/profile/profileTypes"
import type { SearchQueryType } from "./SearchDialogDrawer"
import PromptSearchList from "./PromptSearchList"
import CreatorSeachList from "./CreatorSearchList"

function InnerDialogSearchResult({
	searchQuery,
}: {
	searchQuery: SearchQueryType
}) {
	const [promptData, setPromptData] = useState<PromptApiResponseType | null>(
		null as unknown as PromptApiResponseType,
	)
	const [creatorData, setCreatorData] = useState<ProfileForSearchListType[]>([])
	const [isNodata, setIsNodata] = useState(false)

	const debounceRes = useCallback(
		debounce(async (keyword: string, tabName: string) => {
			if (keyword === "" && tabName === "prompt") {
				setPromptData(null as unknown as PromptApiResponseType)
				setIsNodata(false)
				return
			}
			if (keyword === "" && tabName === "creator") {
				setCreatorData([])
				setIsNodata(false)
				return
			}
			const res = await fetchSearchResults(keyword, tabName)
			// console.log(tabName);
			// console.log(res);
			if (tabName === "prompt") {
				if (
					(res as unknown as PromptApiResponseType).productList.length === 0
				) {
					setIsNodata(true)
				}
				setPromptData(res as unknown as PromptApiResponseType)
			} else {
				if ((res as ProfileForSearchListType[]).length === 0) {
					setIsNodata(true)
				}
				setCreatorData(res as ProfileForSearchListType[])
			}
		}, 1000),
		[setPromptData, setCreatorData],
	)

	useEffect(() => {
		// if (searchQuery.keyword === '') return;
		setIsNodata(false)
		debounceRes(searchQuery.keyword, searchQuery.tabName)
		return () => debounceRes.cancel()
	}, [searchQuery, debounceRes])

	return (
		<section className="max-h-[30vh] overflow-y-auto">
			{searchQuery.tabName === "prompt" && promptData ? (
				<PromptSearchList data={promptData} />
			) : null}
			{searchQuery.tabName === "creator" && creatorData.length > 0 && (
				<CreatorSeachList data={creatorData} />
			)}
			{isNodata ? <p className="text-sm text-white">no data</p> : null}
		</section>
	)
}

export default InnerDialogSearchResult

