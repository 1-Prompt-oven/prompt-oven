"use client"

import { Button } from "@repo/ui/button"
import {
	sellorFollowAction,
	sellorUnFollowAction,
} from "@/action/prompt-detail/getProductDetailFollowData"
import type { ProfileDetailSellorShortType } from "@/types/prompt-detail/promptDetailType"

interface PromptDetailSellorFollowProps {
	sellerData: ProfileDetailSellorShortType
	followState: boolean
}

export default function PromptDetailSellorFollow({
	sellerData,
	followState,
}: PromptDetailSellorFollowProps) {
	const followHandler = async (state: boolean) => {
		let isSuccess

		if (state) {
			isSuccess = await sellorUnFollowAction(sellerData.memberNickname)
		} else {
			isSuccess = await sellorFollowAction(sellerData.memberNickname)
		}

		if (!isSuccess) {
			// eslint-disable-next-line no-console -- Fail to Update Follow State
			console.log("팔로우 업데이트에 실패하였습니다.")
		}
	}

	return (
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
	)
}
