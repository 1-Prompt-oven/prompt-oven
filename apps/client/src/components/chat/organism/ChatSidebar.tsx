"use client"

import { MessageSquarePlus, X } from "@repo/ui/lucide"
import React, { useEffect, useState } from "react"
// eslint-disable-next-line import/named -- lodash는 named export입니다.
import { debounce } from "lodash"
import { ChAvatar } from "@/components/chat/atom/ChAvatar.tsx"
import type { GetReactiveChatRoomListResponseType } from "@/types/chat/chatTypes.ts"
import ChSearchBar from "@/components/chat/atom/ChSearchBar.tsx"

interface ChatSidebarProps {
	memberUuid: string
	selectedChatRoomId?: string
	onSelectChatRoom: (room: GetReactiveChatRoomListResponseType) => void
	onClose: () => void
}

export function ChatSidebar({
	memberUuid,
	selectedChatRoomId,
	onSelectChatRoom,
	onClose,
}: ChatSidebarProps) {
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [chatRoomList, setChatRoomList] = useState<
		GetReactiveChatRoomListResponseType[]
	>([])
	const [searchTerm, setSearchTerm] = useState("")

	// SSE event source
	useEffect(() => {
		setIsLoading(true)
		const eventSource = new EventSource(`/api/chat/room?userUuid=${memberUuid}`)

		eventSource.onopen = () => {
			setIsLoading(false)
		}

		eventSource.onmessage = (event: MessageEvent<string>) => {
			// console.log("event.data: ", event.data)
			// string으로 인코딩된 데이터를 GetReactiveChatMessageResponseType 타입으로 파싱
			const newRooms = JSON.parse(
				event.data,
			) as GetReactiveChatRoomListResponseType

			setChatRoomList((prevRooms) => [newRooms, ...prevRooms])
		}

		eventSource.onerror = (err) => {
			// eslint-disable-next-line no-console -- error log
			console.error("EventSource failed:", err)
			setError("채팅방 목록을 불러오는데 실패했습니다.")
			eventSource.close()
		}

		return () => {
			eventSource.close()
		}
	}, [memberUuid])

	const filteredChatRooms = chatRoomList.filter((room) =>
		room.chatRoomName.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	return (
		<div className="flex h-full w-full flex-col border-r border-r-[#E3E8E7]/50 bg-[#111111] md:!w-[424px]">
			<div className="flex items-center justify-between border-b border-[#A913F9] p-4 md:!p-6">
				<h1 className="text-lg font-semibold text-[#E2ADFF]">Messages</h1>
				<div className="flex items-center gap-3.5">
					<button
						type="button"
						className="rounded-full border border-[#9F9F9F] p-2.5 hover:bg-[#404040]/10 md:!hidden"
						onClick={onClose}>
						<X className="h-5 w-5 text-[#E2ADFF]" />
					</button>

					<button
						type="button"
						className="rounded-full border border-[#9F9F9F] p-2.5 hover:bg-[#404040]/10">
						<MessageSquarePlus className="h-5 w-5 text-[#E2ADFF]" />
					</button>
				</div>
			</div>

			<div className="p-4">
				<ChSearchBar
					type="text"
					placeholder="Search chats..."
					value={searchTerm}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						debounce(() => setSearchTerm(e.target.value), 400)
					}}
				/>
			</div>

			<div className="flex-1 overflow-y-auto">
				{/* eslint-disable-next-line no-nested-ternary -- ok */}
				{isLoading ? (
					<div className="flex h-full items-center justify-center">
						<p className="text-[#E2ADFF]">Loading chat rooms...</p>
					</div>
				) : // eslint-disable-next-line no-nested-ternary -- ok
				error ? (
					<div className="flex h-full items-center justify-center">
						<p className="text-red-500">{error}</p>
					</div>
				) : filteredChatRooms.length === 0 ? (
					<div className="flex h-full items-center justify-center">
						<p className="text-[#E2ADFF]">No chat rooms found</p>
					</div>
				) : (
					filteredChatRooms.map((room) => (
						<button
							type="button"
							key={room.chatRoomId}
							onClick={() => onSelectChatRoom(room)}
							className={`flex items-center gap-2.5 p-6 transition-colors hover:bg-[#404040] ${
								selectedChatRoomId === room.chatRoomId ? "bg-[#404040]" : ""
							}`}>
							<ChAvatar src="/placeholder.svg" alt={room.chatRoomName} />
							<div className="flex-1 text-left">
								<h3 className="text-sm font-semibold text-[#E2ADFF]">
									{room.chatRoomName}
								</h3>
								<p className="line-clamp-2 text-xs text-[#B1B1B1]">
									{room.recentMessage}
								</p>
							</div>
							<div className="flex flex-col items-end gap-4">
								<span className="text-xs text-[#B1B1B1]">
									{new Date(room.recentMessageTime).toLocaleTimeString()}
								</span>
								{/* Add unread message count if available in the API response */}
							</div>
						</button>
					))
				)}
			</div>
		</div>
	)
}

/*

<button
						type="button"
						className="rounded-full border border-[#9F9F9F] p-2.5 hover:bg-[#404040]/10">
						<MoreVertical className="h-5 w-5 text-[#E2ADFF]" />
					</button>

<button
						type="button"
						className="rounded-full border border-[#9F9F9F] p-2.5 hover:bg-[#404040]/10">
						<Search className="h-5 w-5 text-[#E2ADFF]" />
					</button>

 */
