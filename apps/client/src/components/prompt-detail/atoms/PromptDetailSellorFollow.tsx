"use client"

import { useState } from "react"
import { Button } from "@repo/ui/button"
import {
	sellorFollowAction,
	sellorUnFollowAction,
} from "@/action/prompt-detail/getProductDetailFollowData"
import ResultModal from "@/components/common/atom/ResultModal"
import type { ProfileDetailSellorShortType } from "@/types/prompt-detail/promptDetailType"

interface PromptDetailSellorFollowProps {
	sellerData: ProfileDetailSellorShortType
	followState: boolean
}

export default function PromptDetailSellorFollow({
	sellerData,
	followState,
}: PromptDetailSellorFollowProps) {
	const [modalContent, setModalContent] = useState<{
		res: boolean
		state: string
	}>({ res: false, state: "" })

	const followHandler = async (state: boolean) => {
		let responseFollow

		if (state) {
			responseFollow = await sellorUnFollowAction(sellerData.memberNickname)
		} else {
			responseFollow = await sellorFollowAction(sellerData.memberNickname)
		}

		const result = responseFollow.result

		if (result.res) return

		if (result.state === "NoUser")
			setModalContent({ res: true, state: "NoUser" })
		else if (result.state === "resError")
			setModalContent({ res: true, state: "resError" })
		else setModalContent({ res: true, state: "none" })
	}

	return (
		<>
			<div>
				{!followState ? (
					<Button
						variant="secondary"
						className="h-12 rounded-full bg-gradient-to-r from-[#d48585] to-[#ca4646] text-white hover:opacity-90"
						onClick={() => followHandler(followState)} // 버튼 클릭 시 상태 변경
					>
						<span className="p-2">FOLLOW</span>
					</Button>
				) : (
					<Button
						variant="secondary"
						className="h-12 rounded-full bg-gradient-to-r from-[#d48585] to-[#ca4646] text-white hover:opacity-90"
						onClick={() => followHandler(followState)} // 버튼 클릭 시 상태 변경
					>
						<span className="p-2">UNFOLLOW</span>
					</Button>
				)}
			</div>
			<ResultModal content={modalContent} setContent={setModalContent} />
		</>
	)
}
