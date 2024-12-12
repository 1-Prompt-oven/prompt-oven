"use client"

import { useState } from "react"
import { ChatSidebar } from "@/components/chat/organism/ChatSidebar.tsx"
import { ChatMain } from "@/components/chat/organism/ChatMain.tsx"
import type { GetReactiveChatRoomListResponseType } from "@/types/chat/chatTypes.ts"
import { ChatPlaceholder } from "@/components/chat/molecule/ChatMainPlaceholder.tsx"

export interface ChatPageProps {
	roomId: string
	memberUuid: string
}

export default function ChatPage({ roomId, memberUuid }: ChatPageProps) {
	const [showProfile, setShowProfile] = useState(false)
	const [showSidebar, setShowSidebar] = useState(false)

	const [selectedRoom, setSelectedRoom] =
		useState<GetReactiveChatRoomListResponseType>(
			{} as GetReactiveChatRoomListResponseType,
		)

	return (
		<div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#111111]">
			<div
				className={`absolute inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out md:!static md:!w-[424px] ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
				<ChatSidebar
					memberUuid={memberUuid}
					selectedChatRoomId={selectedRoom.chatRoomId}
					onSelectChatRoom={(room) => {
						setSelectedRoom(room)
						setShowSidebar(false)
					}}
					onClose={() => setShowSidebar(false)}
				/>
			</div>
			<div className="flex flex-1 flex-col overflow-hidden md:!flex-row">
				<div className="flex flex-1 flex-col">
					{selectedRoom.chatRoomId ? (
						<ChatMain
							memberUuid={memberUuid}
							roomId={roomId}
							chatRoom={selectedRoom}
							onProfileClick={() => setShowProfile(!showProfile)}
							onOpenSidebar={() => setShowSidebar(!showSidebar)}
						/>
					) : (
						<ChatPlaceholder />
					)}
				</div>
				<div
					className={`absolute inset-y-0 right-0 z-30 transition-transform duration-300 ease-in-out md:!static ${showProfile ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}>
					{/*<ChatProfileSidebar*/}
					{/*	contact={{*/}
					{/*		id: selectedRoom.id,*/}
					{/*		name: selectedRoom.name,*/}
					{/*		phone: "+6284532234651",*/}
					{/*		avatarSrc: selectedRoom.avatarSrc,*/}
					{/*	}}*/}
					{/*	onClose={() => setShowProfile(false)}*/}
					{/*	isOpen={showProfile}*/}
					{/*/>*/}
				</div>
			</div>
		</div>
	)
}
