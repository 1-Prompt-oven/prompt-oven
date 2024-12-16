"use client"

import { useRouter } from "next/navigation"
import { startTalkWith } from "@/action/chat/chatAction.ts"
import GradientButton from "@/components/common/atom/GradientButton.tsx"

interface ChattingButtonProps {
	sellerUuid: string
	chatRoomName: string
}

export default function ChattingButton({
	sellerUuid,
	chatRoomName,
}: ChattingButtonProps) {
	const router = useRouter()
	const chatWithPeople = async (partner: string) => {
		const chatRoom = await startTalkWith(partner, chatRoomName)
		router.push(`/chat?roomId=${chatRoom.roomId}`)
	}

	return (
		<section>
			<GradientButton
				type="button"
				onClick={() => {
					chatWithPeople(sellerUuid).then()
				}}>
				Commission
			</GradientButton>
		</section>
	)
}
