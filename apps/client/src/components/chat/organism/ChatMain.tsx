"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import { EventSourcePolyfill } from "event-source-polyfill"
import { ThreeDots } from "react-loader-spinner"
import { ChatHeader } from "@/components/chat/molecule/ChatHeader"
import { ChatInput } from "@/components/chat/molecule/ChatInput.tsx"
import { ChMessageBubble } from "@/components/chat/atom/ChMessageBubble.tsx"
import { ChAvatar } from "@/components/chat/atom/ChAvatar.tsx"
import {
	getPreviousChatMessages,
	sendChatMessage,
} from "@/action/chat/chatAction.ts"
import type {
	ChatMessage,
	GetReactiveChatRoomListResponseType,
} from "@/types/chat/chatTypes.ts"
import { getKstTime } from "@/lib/time.ts"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes.ts"

interface ChatMainProps {
	memberUuid: string
	partner: ProfileMemberInfoType
	chatRoom: GetReactiveChatRoomListResponseType
	onProfileClick?: () => void
	onOpenSidebar?: () => void
}

export function ChatMain({
	memberUuid,
	partner,
	chatRoom,
	onProfileClick,
	onOpenSidebar,
}: ChatMainProps) {
	const [error, setError] = useState<string | null>(null)
	const [allMessages, setAllMessages] = useState<ChatMessage[]>([])
	const messagesEndRef = useRef<HTMLDivElement>(null)

	// SSE event source
	useEffect(() => {
		let eventSource: EventSource | null = null
		let retryCount = 0
		const maxRetries = 5
		const retryDelay = 3000 // 3초

		const connectSSE = () => {
			eventSource = new EventSourcePolyfill(
				`/api/chat/message?roomId=${chatRoom.chatRoomId}`,
				{
					// withCredentials: true,
					heartbeatTimeout: 600000, // 10분
				},
			)

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
				const newMessage = JSON.parse(event.data) as ChatMessage
				setAllMessages((prevMessages) => [newMessage, ...prevMessages])
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

		connectSSE()

		return () => {
			eventSource?.close()
		}
	}, [chatRoom.chatRoomId])

	// 무한 스크롤을 위한 Intersection Observer
	const { ref, inView } = useInView({ delay: 1500 })

	// 이전 메시지 가져오기 위한 Infinite Query
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: [
				`ChatMessages`,
				{
					roomId: chatRoom.chatRoomId,
					memberUuid,
				},
			],
			queryFn: async (arg) => {
				// console.log("pageParam in inf query: ", arg)
				const response = await getPreviousChatMessages({
					roomId: chatRoom.chatRoomId,
					lastObjectId: arg.pageParam,
					pageSize: 20,
				})
				if (!response.isSuccess) {
					throw new Error("메시지를 가져오는데 실패했습니다")
				}
				return response.result
			},
			initialPageParam: "",
			getNextPageParam: (mpr) => {
				if (mpr.hasNext && mpr.lastObjectId) {
					return mpr.lastObjectId
				}
				return undefined
			},
			refetchInterval: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(chatRoom.chatRoomId),
		})

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage().then()
		}
	}, [inView, hasNextPage, isFetchingNextPage])

	useEffect(() => {
		const newMessages = [
			...(data?.pages.flatMap((page) =>
				page.content.map((msg) => ({
					...msg,
				})),
			) || []),
		]
		setAllMessages(newMessages)
	}, [data])

	const handleSendMessage = async (message: string) => {
		try {
			await sendChatMessage({
				roomId: chatRoom.chatRoomId,
				messageType: "text",
				message,
				senderUuid: memberUuid,
			})
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
		} catch (err) {
			// eslint-disable-next-line no-console -- 오류 출력
			console.error("메시지 전송 중 오류 발생:", err)
			setError("메시지 전송에 실패했습니다")
		}
	}

	return (
		<div className="relative flex flex-1 flex-col overflow-hidden bg-[#424242]">
			<ChatHeader
				name={partner.nickname}
				isActive={chatRoom.partnerIsActive}
				avatarSrc={partner.avatarImageUrl}
				onProfileClick={onProfileClick}
				onOpenSidebar={onOpenSidebar}
			/>

			{/*  */}
			<div className="flex max-h-[calc(100vh-244px)] flex-1 flex-col-reverse space-y-4 !overflow-y-auto p-4 md:!space-y-6 md:!p-8">
				<div ref={messagesEndRef} /> {/* 새 메시지 추가 시 스크롤 위치 */}
				{allMessages.map((message) => (
					<div
						key={message.id}
						className={`flex items-end gap-4 ${message.senderUuid === memberUuid ? "flex-row-reverse" : ""}`}>
						{message.senderUuid !== memberUuid && (
							<ChAvatar src="" alt={chatRoom.chatRoomName} size="sm" />
						)}
						<ChMessageBubble
							content={message.message}
							timestamp={getKstTime(message.createdAt).format("hh:mm A")}
							isOwn={message.senderUuid === memberUuid}
						/>
					</div>
				))}
				<div ref={ref} className="h-1 w-full" />{" "}
				{/* Intersection Observer 참조 요소 */}
				{isFetchingNextPage ? (
					<div className="flex justify-center bg-[#424242] p-2">
						<ThreeDots
							height="50"
							width="50"
							radius="9"
							color="#E2ADFF"
							ariaLabel="three-dots-loading"
						/>
					</div>
				) : null}
			</div>

			<ChatInput onSendMessage={handleSendMessage} error={error} />
		</div>
	)
}
