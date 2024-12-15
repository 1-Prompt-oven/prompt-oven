"use client"
import React, { useCallback, useEffect, useState } from "react"
import debounce from "lodash/debounce"
import { ThreeDots } from "react-loader-spinner"
import { fetchSearchResults } from "@/action/search/searchAction"
import type { PromptApiResponseType } from "@/types/common/responseType"
import type { ProfileForSearchListType } from "@/types/profile/profileTypes"
import type { SearchQueryType } from "./SearchDialogDrawer"
import PromptSearchList from "./PromptSearchList"
import CreatorSearchList from "./CreatorSearchList"

function InnerDialogSearchResult({
	searchQuery,
	closeDialog,
}: {
	searchQuery: SearchQueryType
	closeDialog: () => void
}) {
	const [promptData, setPromptData] = useState<PromptApiResponseType | null>(
		null as unknown as PromptApiResponseType,
	)
	const [creatorData, setCreatorData] = useState<ProfileForSearchListType[]>([])
	const [isNodata, setIsNodata] = useState(false)
	const [loading, setLoading] = useState(false)

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
			setLoading(false)
		}, 1000),
		[setPromptData, setCreatorData],
	)

	useEffect(() => {
		setIsNodata(false)
		setLoading(true)
		debounceRes(searchQuery.keyword, searchQuery.tabName)
		return () => debounceRes.cancel()
	}, [searchQuery, debounceRes])

	return (
		<section className="mt-3 max-h-[30vh] overflow-y-auto">
			{searchQuery.tabName === "prompt" && promptData ? (
				<PromptSearchList data={promptData} closeDialog={closeDialog} />
			) : null}
			{searchQuery.tabName === "creator" && creatorData.length > 0 && (
				<CreatorSearchList data={creatorData} closeDialog={closeDialog} />
			)}
			{isNodata ? (
				<p className="mt-4 text-center text-lg text-white">No Data</p>
			) : null}
			{searchQuery.keyword !== "" && loading ? (
				<div className="mb-8 mt-4 flex flex-col items-center justify-center">
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
					<span className="text-base font-medium leading-[150%] text-white">
						Loading...
					</span>
				</div>
			) : null}
		</section>
	)
}

export default InnerDialogSearchResult

