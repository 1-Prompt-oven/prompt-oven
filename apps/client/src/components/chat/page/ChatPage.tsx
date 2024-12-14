"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChatSidebar } from "@/components/chat/organism/ChatSidebar.tsx"
import { ChatMain } from "@/components/chat/organism/ChatMain.tsx"
import type {
	ChatRoom,
	GetReactiveChatRoomListResponseType,
} from "@/types/chat/chatTypes.ts"
import { ChatPlaceholder } from "@/components/chat/molecule/ChatMainPlaceholder.tsx"
import { ChatProfileSidebar } from "@/components/chat/organism/ChatProfileSidebar.tsx"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes.ts"

export interface ChatPageProps {
	chatRoom?: ChatRoom
	partnerProfile?: ProfileMemberInfoType
	memberUuid: string
}

export default function ChatPage({
	chatRoom,
	memberUuid,
	partnerProfile,
}: ChatPageProps) {
	const router = useRouter()
	const [showProfile, setShowProfile] = useState(false)
	const [showSidebar, setShowSidebar] = useState(false)

	const [selectedRoom, setSelectedRoom] =
		useState<GetReactiveChatRoomListResponseType>(chatRoom ?? ({} as ChatRoom))

	return (
		<div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#111111]">
			<div
				className={`absolute inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out md:!static md:!w-[424px] ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
				<ChatSidebar
					selectedChatRoom={chatRoom}
					memberUuid={memberUuid}
					onSelectChatRoom={(room) => {
						// room read update 추가해야함.
						setSelectedRoom(room)
						setShowSidebar(false)
						router.push(`/chat?roomId=${room.chatRoomId}`)
					}}
					onClose={() => setShowSidebar(false)}
				/>
			</div>
			<div className="flex flex-1 flex-col overflow-hidden md:!flex-row">
				<div className="flex flex-1 flex-col">
					{selectedRoom.chatRoomId && partnerProfile?.memberUUID ? (
						<ChatMain
							partner={partnerProfile}
							memberUuid={memberUuid}
							chatRoom={selectedRoom}
							onProfileClick={() => setShowProfile(!showProfile)}
							onOpenSidebar={() => setShowSidebar(!showSidebar)}
						/>
					) : (
						<ChatPlaceholder />
					)}
				</div>
				{partnerProfile?.memberUUID ? (
					<div
						className={`absolute inset-y-0 right-0 z-30 transition-transform duration-300 ease-in-out md:!static ${showProfile ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}>
						<ChatProfileSidebar
							memberUuid={memberUuid}
							partner={partnerProfile}
							onClose={() => setShowProfile(false)}
							isOpen={showProfile}
						/>
					</div>
				) : null}
			</div>
		</div>
	)
}
