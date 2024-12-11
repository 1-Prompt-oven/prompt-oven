"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ChatHeader } from "@/components/chat/molecule/ChatHeader"
import { ChatInput } from "@/components/chat/molecule/ChatInput.tsx"
import { ChMessageBubble } from "@/components/chat/atom/ChMessageBubble.tsx"
import { ChAvatar } from "@/components/chat/atom/ChAvatar.tsx"
import useSSE from "@/hooks/chat/useSSE.ts"
import {
	getPreviousChatMessages,
	sendChatMessage,
} from "@/action/chat/chatAction.ts"

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
	const { messages: sseMessages } = useSSE(roomId)
	const { ref, inView } = useInView()
	const messageContainerRef = useRef<HTMLDivElement>(null)

	// console.log("in ChatMain: ", roomId, memberUuid, contact)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...result } =
		useInfiniteQuery({
			queryKey: ["chatMsg", roomId],
			queryFn: async ({ pageParam = 0 }) => {
				const response = await getPreviousChatMessages({
					roomId,
					lastObjectId: "", // 뭘 넣어줘야 하지??
					pageSize: 20,
					page: pageParam,
				})
				// eslint-disable-next-line no-console -- 결과 출력
				console.log("response in inf query: ", response)
				// eslint-disable-next-line no-console -- 결과 출력
				console.log("result in inf query: ", result)
				if (!response.isSuccess) {
					throw new Error("메시지를 가져오는데 실패했습니다")
				}
				return response.result
			},
			getNextPageParam: (mpr) => {
				// eslint-disable-next-line no-console -- 결과 출력
				console.log("in getNextpageParam : ", mpr.page, "\n\n", mpr)
				if (mpr.hasNext) {
					return mpr.page + 1
				}
				return undefined
			},
			initialPageParam: 0,
			refetchOnWindowFocus: false,
		})

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage().then()
		}
	}, [inView, hasNextPage, isFetchingNextPage])

	const allMessages = [
		...(data?.pages.flatMap((page) =>
			page.content.map((msg) => ({
				...msg,
				createdAt: new Date(msg.createdAt),
			})),
		) || []),
		...sseMessages,
	]

	useEffect(() => {
		if (messageContainerRef.current) {
			const { scrollHeight, clientHeight } = messageContainerRef.current
			messageContainerRef.current.scrollTop = scrollHeight - clientHeight
		}
	}, [allMessages])

	const handleSendMessage = async (message: string) => {
		try {
			await sendChatMessage({
				roomId,
				messageType: "text",
				message,
				senderUuid: memberUuid,
			})
			// console.log("handleSendMessage after api call: ", message)
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

			<div
				ref={messageContainerRef}
				className="flex flex-1 flex-col-reverse space-y-4 overflow-y-auto p-4 md:space-y-6 md:p-8">
				{allMessages.map((message) => (
					<div
						key={message.id}
						className={`flex items-end gap-4 ${message.senderUuid === memberUuid ? "flex-row-reverse" : ""}`}>
						{message.senderUuid !== memberUuid && (
							<ChAvatar src={contact.avatarSrc} alt={contact.name} size="sm" />
						)}
						<ChMessageBubble
							content={message.message}
							timestamp={new Date(message.createdAt).toLocaleTimeString()}
							isOwn={message.senderUuid === memberUuid}
						/>
					</div>
				))}
				{hasNextPage ? (
					<button
						ref={ref}
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						className="mb-4 w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-blue-300">
						{isFetchingNextPage ? "로딩 중..." : "이전 메시지 불러오기"}
					</button>
				) : null}
			</div>

			<ChatInput onSendMessage={handleSendMessage} error={error} />
		</div>
	)
}
