"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { EventSource } from "event-source-polyfill"
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
	GetReactiveChatMessageResponseType,
	GetReactiveChatRoomListResponseType,
} from "@/types/chat/chatTypes.ts"

interface ChatMainProps {
	roomId: string
	memberUuid: string
	chatRoom: GetReactiveChatRoomListResponseType
	onProfileClick?: () => void
	onOpenSidebar?: () => void
}

export function ChatMain({
	roomId,
	memberUuid,
	chatRoom,
	onProfileClick,
	onOpenSidebar,
}: ChatMainProps) {
	const [error, setError] = useState<string | null>(null)
	const [allMessages, setAllMessages] = useState<
		GetReactiveChatMessageResponseType[]
	>([])
	const messagesEndRef = useRef<HTMLDivElement>(null)

	// SSE event source
	useEffect(() => {
		const eventSource = new EventSource(`/api/chat/message?roomId=${roomId}`)

		eventSource.onmessage = (event: MessageEvent<string>) => {
			// string으로 인코딩된 데이터를 GetReactiveChatMessageResponseType 타입으로 파싱
			const newMessage = JSON.parse(
				event.data,
			) as GetReactiveChatMessageResponseType
			setAllMessages((prevMessages) => [newMessage, ...prevMessages])
		}

		eventSource.onerror = (err) => {
			// eslint-disable-next-line no-console -- error log
			console.error("EventSource failed:", err)
			eventSource.close()
		}

		return () => {
			eventSource.close()
		}
	}, [roomId])

	// 무한 스크롤을 위한 Intersection Observer
	const { ref, inView } = useInView({ delay: 1500 })

	// 이전 메시지 가져오기 위한 Infinite Query
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: [
				`ChatMessages`,
				{
					roomId,
					memberUuid,
				},
			],
			queryFn: async (arg) => {
				// console.log("pageParam in inf query: ", arg)
				const response = await getPreviousChatMessages({
					roomId,
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
			enabled: Boolean(roomId),
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
					createdAt: msg.createdAt,
				})),
			) || []),
		]
		setAllMessages(newMessages)
	}, [data])

	const handleSendMessage = async (message: string) => {
		try {
			await sendChatMessage({
				roomId,
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

	// if (status === "loading")
	// 	return <div className="p-4 text-center">로딩 중...</div>
	// if (status === "error" || queryError || sseError)
	// 	return (
	// 		<div className="p-4 text-center text-red-500">
	// 			에러: {(queryError as Error).message || sseError || "알 수 없는 오류"}
	// 		</div>
	// 	)

	return (
		<div className="relative flex flex-1 flex-col overflow-hidden bg-[#424242]">
			<ChatHeader
				name={chatRoom.chatRoomName}
				isActive={chatRoom.partnerIsActive}
				avatarSrc=""
				onProfileClick={onProfileClick}
				onOpenSidebar={onOpenSidebar}
			/>

			{/*  */}
			<div className="flex max-h-[calc(100vh-255px)] flex-1 flex-col-reverse space-y-4 !overflow-y-auto p-4 md:!space-y-6 md:!p-8">
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
							timestamp={dayjs(message.createdAt).format("hh:mm A")}
							isOwn={message.senderUuid === memberUuid}
						/>
					</div>
				))}
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
				<div ref={ref} className="h-1 w-full" />{" "}
			</div>

			<ChatInput onSendMessage={handleSendMessage} error={error} />
		</div>
	)
}
