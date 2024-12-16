"use client"

import { useRouter } from "next/navigation"
import { startTalkWith } from "@/action/chat/chatAction.ts"
import LoadingButton from "@/components/common/atom/LoadingButton.tsx"
import { cn } from "@/lib/utils.ts"

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
			<LoadingButton
				type="button"
				className={cn(
					"h-[40px] w-[100px] px-[20px] py-[10px]",
					"text-center text-white",
					"font-sora text-[15px] font-semibold leading-[20px]",
					"rounded-[10px]",
					"transition-all duration-300 ease-in-out",
					"hover:opacity-90",
					"focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50",
					"disabled:opacity-50",
					"bg-gradient-to-r from-[#A913F9] to-[#9D3D81]", // gradient 값
				)}
				isAsync
				onClick={() => {
					chatWithPeople(sellerUuid).then()
				}}>
				대화하기
			</LoadingButton>
		</section>
	)
}
