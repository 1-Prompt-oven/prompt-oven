"use client"

import { useRouter } from "next/navigation"
import { startTalkWith } from "@/action/chat/chatAction.ts"
import GradientButton from "@/components/common/atom/GradientButton.tsx"

const _host = "e69421fc-b449-4820-a7c2-439ac5cdc69b"
const _partner = "6c195802-6051-4414-a8a6-5fd33b4bc420"

export default function Page() {
	const router = useRouter()
	const chatWithPeople = async (host: string, partner: string) => {
		// eslint-disable-next-line no-console -- log
		console.log(`Chatting with ${partner} as ${host}`)
		const randomId = Math.random().toString(36)
		const roomName = `chat-${randomId}` // 테스트용 랜덤 채팅방 이름
		const chatRoom = await startTalkWith(host, partner, roomName)
		router.push(`/chat?roomId=${chatRoom.roomId}`)
	}

	return (
		<section>
			<GradientButton
				type="button"
				onClick={() => {
					chatWithPeople(_host, _partner).then()
				}}>
				채팅 테스트다 이자식아
			</GradientButton>
		</section>
	)
}
