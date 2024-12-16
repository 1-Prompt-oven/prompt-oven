"use client"

import { useRouter } from "next/navigation"
import { startTalkWith } from "@/action/chat/chatAction.ts"
import GradientButton from "@/components/common/atom/GradientButton.tsx"

interface ChattingButtonProps {
	sellerUuid: string
}

export default function ChattingButtion({ sellerUuid }: ChattingButtonProps) {
	const router = useRouter()
	const chatWithPeople = async (partner: string) => {
		// eslint-disable-next-line no-console -- log
		// console.log(`Chatting with ${partner} as ${host}`)
		const randomId = Math.random().toString(36)
		const roomName = `chat-${randomId}` // 테스트용 랜덤 채팅방 이름
		const chatRoom = await startTalkWith(partner, roomName)
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
