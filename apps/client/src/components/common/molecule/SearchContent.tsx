import React, { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import type { SearchQueryType } from "./SearchDialogDrawer"
import InnerDialogSearchResult from "./InnerDialogSearchResult"

function SearchContent({ closeDialog }: { closeDialog: () => void }) {
	const router = useRouter()
	const [selectedTab, setSelectedTab] = useState("prompt")
	const [queryParam, setQueryParam] = useState({
		keyword: "",
		tabName: "prompt",
	} as SearchQueryType)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value
		// 공백 예외처리 추가
		setQueryParam({
			...queryParam,
			keyword: newQuery,
		})
	}

	const handleTabChange = (tabName: string) => {
		setQueryParam({
			...queryParam,
			tabName,
		})
		setSelectedTab(tabName)
	}

	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && queryParam.keyword !== "") {
			e.preventDefault()
			router.push(`/${queryParam.tabName}?keyword=${queryParam.keyword}`)
			closeDialog()
		}
	}

	return (
		<section>
			<div className="mb-4 flex w-full items-center justify-start gap-4">
				<Button
					variant="outline"
					size="sm"
					className={`border-[#666666] bg-black text-white hover:bg-[#333333] hover:text-white ${selectedTab === "prompt" ? "border-fuchsia-500" : ""}`}
					onClick={() => handleTabChange("prompt")}>
					PROMPT
				</Button>
				<Button
					variant="outline"
					size="sm"
					className={`border-[#666666] bg-black text-white hover:bg-[#333333] hover:text-white ${selectedTab === "creator" ? "border-fuchsia-500" : ""}`}
					onClick={() => handleTabChange("creator")}>
					CREATOR
				</Button>
			</div>
			<Input
				onKeyDown={handleEnter}
				onChange={handleInputChange}
				value={queryParam.keyword}
				placeholder={
					selectedTab === "prompt"
						? "어떤 프롬프트를 찾고 계신가요?"
						: "누굴 찾고 계신가요?"
				}
				className="my-2 border-[1px] border-zinc-500 bg-fuchsia-500 py-[1.25rem] text-lg text-white placeholder:!text-sm placeholder:text-white"
			/>
			<Suspense fallback={<div className="text-white">Loading...</div>}>
				<InnerDialogSearchResult searchQuery={queryParam} />
			</Suspense>
		</section>
	)
}

export default SearchContent

