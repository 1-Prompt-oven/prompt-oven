"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { EventSourcePolyfill } from "event-source-polyfill"
import { ChatHeader } from "@/components/chat/molecule/ChatHeader"
import { ChatInput } from "@/components/chat/molecule/ChatInput.tsx"
import { ChMessageBubble } from "@/components/chat/atom/ChMessageBubble.tsx"
import { ChAvatar } from "@/components/chat/atom/ChAvatar.tsx"
import {
	getPreviousChatMessages,
	sendChatMessage,
} from "@/action/chat/chatAction.ts"
import type { GetReactiveChatMessageResponseType } from "@/types/chat/chatTypes.ts"

// interface Message {
// 	id: string
// 	content: string
// 	timestamp: string
// 	isOwn: boolean
// 	hasRead?: boolean
// }

interface ChatMainProps {
	roomId: string
	memberUuid: string
	contact: {
		id: string
		name: string
		isActive?: boolean
		avatarSrc?: string
	}
	onProfileClick?: () => void
	onOpenSidebar?: () => void
}

export function ChatMain({
	roomId,
	memberUuid,
	contact,
	onProfileClick,
	onOpenSidebar,
}: ChatMainProps) {
	const [error, setError] = useState<string | null>(null)
	const [allMessages, setAllMessages] = useState<
		GetReactiveChatMessageResponseType[]
	>([])

	useEffect(() => {
		const eventSource = new EventSourcePolyfill(
			`/api/chatting?roomId=${roomId}`,
		)

		eventSource.onmessage = (event) => {
			// eslint-disable-next-line no-console -- This is a server-side only log
			console.log("eventsource event: ", event)
			// 'data:' 접두사 제거
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access -- ok
			const cleanData = event.data.replace(/^data:/, "")
			// eslint-disable-next-line no-console -- This is a server-side only log
			console.log("eventsource cleanData: ", cleanData)
			// 첫 번째 파싱 - GetReactiveChatMessageResponseType 타입으로 파싱
			const newMessage = JSON.parse(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ok
				cleanData,
			) as GetReactiveChatMessageResponseType
			// eslint-disable-next-line no-console -- This is a server-side only log
			console.log("eventsource newMessage: ", newMessage)
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

	const { ref, inView } = useInView()

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ["chatMsg", roomId],
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
				// console.log("in getNextpageParam : ", mpr.page, "\n\n", mpr)
				if (mpr.hasNext && mpr.lastObjectId) {
					return mpr.lastObjectId
				}
				return undefined
			},
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
					createdAt: dayjs(msg.createdAt).format("hh:mm A"),
				})),
			) || []),
			...allMessages,
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
		<div className="flex h-full flex-1 flex-col overflow-hidden bg-[#424242]">
			<ChatHeader
				name={contact.name}
				isActive={contact.isActive}
				avatarSrc={contact.avatarSrc}
				onProfileClick={onProfileClick}
				onOpenSidebar={onOpenSidebar}
			/>

			<div className="flex flex-1 flex-col-reverse space-y-4 overflow-y-auto p-4 md:space-y-6 md:p-8">
				{hasNextPage ? (
					<button
						type="button"
						ref={ref}
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						className="mb-4 w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-blue-300">
						{isFetchingNextPage ? "로딩 중..." : "이전 메시지 불러오기"}
					</button>
				) : null}
				{allMessages.map((message) => (
					<div
						key={message.id}
						className={`flex items-end gap-4 ${message.senderUuid === memberUuid ? "flex-row-reverse" : ""}`}>
						{message.senderUuid !== memberUuid && (
							<ChAvatar src={contact.avatarSrc} alt={contact.name} size="sm" />
						)}
						<ChMessageBubble
							content={message.message}
							timestamp={message.createdAt}
							isOwn={message.senderUuid === memberUuid}
						/>
					</div>
				))}
			</div>

			<ChatInput onSendMessage={handleSendMessage} error={error} />
		</div>
	)
}
