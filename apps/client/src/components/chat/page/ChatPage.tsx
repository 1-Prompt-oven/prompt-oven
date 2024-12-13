"use client"

import { useEffect, useState } from "react"
import { ChatSidebar } from "@/components/chat/organism/ChatSidebar.tsx"
import { ChatMain } from "@/components/chat/organism/ChatMain.tsx"
import type { GetReactiveChatRoomListResponseType } from "@/types/chat/chatTypes.ts"
import { ChatPlaceholder } from "@/components/chat/molecule/ChatMainPlaceholder.tsx"
import { ChatProfileSidebar } from "@/components/chat/organism/ChatProfileSidebar.tsx"
import { getProfileMemberInfoByUuid } from "@/action/profile/getProfileData.ts"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes.ts"
// import { UpdateRoomRead } from '@/action/chat/chatAction.ts';

export interface ChatPageProps {
	roomId: string
	memberUuid: string
}

export default function ChatPage({ roomId, memberUuid }: ChatPageProps) {
	const [showProfile, setShowProfile] = useState(false)
	const [showSidebar, setShowSidebar] = useState(false)

	const [selectedRoom, setSelectedRoom] =
		useState<GetReactiveChatRoomListResponseType>({
			chatRoomId: roomId,
		} as GetReactiveChatRoomListResponseType)

	const [chatUserProfile, setChatUserProfile] =
		useState<ProfileMemberInfoType | null>(null)
	useEffect(() => {
		const getChatUserProfile = async () => {
			const response = await getProfileMemberInfoByUuid(
				selectedRoom.partnerUuid,
			)
			setChatUserProfile(response)
		}
		if (selectedRoom.partnerUuid) {
			getChatUserProfile().then()
		}
	}, [selectedRoom.partnerUuid])

	return (
		<div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#111111]">
			<div
				className={`absolute inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out md:!static md:!w-[424px] ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
				<ChatSidebar
					memberUuid={memberUuid}
					onSelectChatRoom={(room) => {
						// UpdateRoomRead({
						// 	roomId: room.chatRoomId,
						// 	userUuid: memberUuid,
						// }).then()
						setSelectedRoom(room)
						setShowSidebar(false)
					}}
					onClose={() => setShowSidebar(false)}
				/>
			</div>
			<div className="flex flex-1 flex-col overflow-hidden md:!flex-row">
				<div className="flex flex-1 flex-col">
					{selectedRoom.chatRoomId && chatUserProfile?.memberUUID ? (
						<ChatMain
							partner={chatUserProfile}
							memberUuid={memberUuid}
							chatRoom={selectedRoom}
							onProfileClick={() => setShowProfile(!showProfile)}
							onOpenSidebar={() => setShowSidebar(!showSidebar)}
						/>
					) : (
						<ChatPlaceholder />
					)}
				</div>
				{chatUserProfile?.memberUUID ? (
					<div
						className={`absolute inset-y-0 right-0 z-30 transition-transform duration-300 ease-in-out md:!static ${showProfile ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}>
						<ChatProfileSidebar
							partner={chatUserProfile}
							onClose={() => setShowProfile(false)}
							isOpen={showProfile}
						/>
					</div>
				) : null}
			</div>
		</div>
	)
}
