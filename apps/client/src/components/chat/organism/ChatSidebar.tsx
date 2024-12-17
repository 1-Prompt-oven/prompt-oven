"use client"

import { X } from "@repo/ui/lucide"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { EventSource } from "event-source-polyfill"
import type {
	ChatRoom as ChatRoomType,
	GetReactiveChatRoomListResponseType,
} from "@/types/chat/chatTypes.ts"
import ChSearchBar from "@/components/chat/atom/ChSearchBar.tsx"
import { ChatRoom } from "@/components/chat/molecule/ChatRoom.tsx"
import { getChatRoomList } from "@/action/chat/chatAction.ts"

interface ChatSidebarProps {
	selectedChatRoom?: ChatRoomType
	memberUuid: string
	onSelectChatRoom: (room: GetReactiveChatRoomListResponseType) => void
	onClose: () => void
}

export function ChatSidebar({
	selectedChatRoom,
	memberUuid,
	onSelectChatRoom,
	onClose,
}: ChatSidebarProps) {
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [chatRoomMap, setChatRoomMap] = useState<
		Map<string, GetReactiveChatRoomListResponseType>
	>(
		selectedChatRoom?.chatRoomId
			? new Map().set(selectedChatRoom.chatRoomId, selectedChatRoom)
			: new Map(),
	)
	const [searchTerm, setSearchTerm] = useState("")

	const filteredChatRooms = useMemo(() => {
		const rooms = Array.from(chatRoomMap.values())
		return rooms
			.filter((room) =>
				room.chatRoomName.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.sort(
				(a, b) =>
					new Date(b.recentMessageTime).getTime() -
					new Date(a.recentMessageTime).getTime(),
			)
	}, [chatRoomMap, searchTerm])

	const updateChatRoomList = useCallback(
		(chatRoomList: GetReactiveChatRoomListResponseType[]) => {
			if (chatRoomList.length === 0) {
				return
			}
			setChatRoomMap((prevMap) => {
				const newMap = new Map(prevMap)
				chatRoomList.forEach((newRoom) => {
					newMap.set(newRoom.chatRoomId, newRoom)
				})
				return newMap
			})
			// setChatRoomMap((prevMap) => {
			// 	const newMap = new Map(prevMap)
			// 	newMap.set(newRoom.chatRoomId, newRoom)
			// 	return newMap
			// })
		},
		[],
	)

	// SSE event source
	useEffect(() => {
		let eventSource: EventSource | null = null
		let retryCount = 0
		const maxRetries = 5
		const retryDelay = 3000 // 3초

		const connectSSE = async () => {
			setIsLoading(true)
			const chatRoomList = (await getChatRoomList({ userUuid: memberUuid }))
				.result
			updateChatRoomList(chatRoomList)

			eventSource = new EventSource(`/api/chat/room?userUuid=${memberUuid}`)
			setIsLoading(false)

			eventSource.onopen = () => {
				retryCount = 0 // 연결 성공 시 재시도 횟수 초기화
			}

			eventSource.onmessage = (event: MessageEvent<string>) => {
				if (event.data === ":keep-alive") {
					// keep-alive 메시지 처리
					// eslint-disable-next-line no-console -- log
					console.log("Received keep-alive message in ChatSidebar")
					return
				}

				// string으로 인코딩된 데이터를 ChatMessage 타입으로 파싱
				const newRooms = JSON.parse(
					event.data,
				) as GetReactiveChatRoomListResponseType
				setChatRoomMap((prevMap) => {
					const newMap = new Map(prevMap)
					newMap.set(newRooms.chatRoomId, newRooms)
					return newMap
				})
			}

			eventSource.onerror = (err) => {
				// eslint-disable-next-line no-console -- error log
				console.error("EventSource failed:", err)
				eventSource?.close()

				if (retryCount < maxRetries) {
					retryCount++
					// eslint-disable-next-line no-console -- error log
					console.log(`Retrying connection (${retryCount}/${maxRetries})...`)
					setTimeout(connectSSE, retryDelay)
				} else {
					setError("채팅방 목록을 불러오는데 실패했습니다.")
				}
			}
		}

		connectSSE().then()

		return () => {
			eventSource?.close()
		}
	}, [memberUuid, updateChatRoomList])

	return (
		<div className="flex h-full w-full flex-col border-r border-r-[#E3E8E7]/50 bg-[#111111] md:!w-[424px]">
			<div className="flex !h-20 items-center justify-between border-b border-[#A913F9] px-6">
				<h1 className="text-lg font-semibold text-[#E2ADFF]">Messages</h1>
				<div className="flex items-center gap-3.5">
					<button
						type="button"
						className="rounded-full border border-[#9F9F9F] p-2.5 hover:bg-[#404040]/10 md:!hidden"
						onClick={onClose}>
						<X className="h-5 w-5 text-[#E2ADFF]" />
					</button>
				</div>
			</div>

			<div className="p-4">
				<ChSearchBar
					onSearch={(value) => {
						setSearchTerm(value)
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
						<p className="text-[#E2ADFF]">채팅방이 없습니다</p>
					</div>
				) : (
					filteredChatRooms.map((room) => (
						<ChatRoom
							key={room.chatRoomId}
							room={room}
							isSelected={selectedChatRoom?.chatRoomId === room.chatRoomId}
							onSelect={onSelectChatRoom}
						/>
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
						<MessageSquarePlus className="h-5 w-5 text-[#E2ADFF]" />
					</button>

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

/*


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

			updateChatRoomList(newRooms)
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


 */
