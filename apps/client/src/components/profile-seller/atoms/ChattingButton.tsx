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
	const chatWithPeople = async (partnerUuid: string) => {
		const chatRoom = await startTalkWith(partnerUuid, chatRoomName)
		router.push(`/chat?roomId=${chatRoom.roomId}`)
	}

	return (
		<section>
			<GradientButton
				type="button"
				className="h-[40px] w-[100px] px-[20px] py-[10px]"
				onClick={() => {
					chatWithPeople(sellerUuid).then()
				}}>
				대화하기
			</GradientButton>
		</section>
	)
}
