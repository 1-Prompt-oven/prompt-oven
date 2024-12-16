"use client"

import { useState } from "react"
import { Button } from "@repo/ui/button"
import { Star } from "@repo/ui/lucide"
import {
	sellorFollowAction,
	sellorUnFollowAction,
} from "@/action/prompt-detail/getProductDetailFollowData"
import ResultModal from "@/components/common/atom/ResultModal"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"

interface ProfileFollowProps {
	memberData: ProfileMemberInfoType
	followState: boolean
}

export default function ProfileFollow({
	memberData,
	followState,
}: ProfileFollowProps) {
	const [modalContent, setModalContent] = useState<{
		res: boolean
		state: string
	}>({ res: false, state: "" })

	const followHandler = async (state: boolean) => {
		let responseFollow

		if (state) {
			responseFollow = await sellorUnFollowAction(memberData.nickname)
		} else {
			responseFollow = await sellorFollowAction(memberData.nickname)
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
			{followState ? (
				<Button
					variant="ghost"
					className="font-mulish bg-white/50 p-1 font-semibold text-white hover:bg-white/60 md:p-4"
					onClick={() => followHandler(followState)}>
					<Star className="mx-2" fill="white" />
					<span className="mr-2 block">Follow</span>
				</Button>
			) : (
				<Button
					variant="ghost"
					className="font-mulish bg-white/50 p-1 font-semibold text-white hover:bg-white/60 md:p-4"
					onClick={() => followHandler(followState)}>
					<Star className="mx-2" />
					<span className="mr-2 block">Follow</span>
				</Button>
			)}
			<ResultModal content={modalContent} setContent={setModalContent} />
		</>
	)
}
