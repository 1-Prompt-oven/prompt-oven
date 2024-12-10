"use client"

import { useEffect, useState } from "react"
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
	contact,
	onProfileClick,
	onOpenSidebar,
}: ChatMainProps) {
	const [error, setError] = useState<string | null>(null)
	const { messages: sseMessages } = useSSE(roomId)
	const { ref, inView } = useInView()

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ["chatMessages", roomId],
			queryFn: async ({ pageParam = 0 }) => {
				const response = await getPreviousChatMessages({
					roomId,
					lastObjectId: "", // 뭘 넣어줘야 하지??
					pageSize: 20,
					page: pageParam,
				})
				// eslint-disable-next-line no-console -- 결과 출력
				console.log("response in inf query: ", response)
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

	const handleSendMessage = async (message: string) => {
		// eslint-disable-next-line no-console -- test console
		console.log("handleSendMessage: ", message)
		try {
			await sendChatMessage({
				roomId,
				messageType: "TEXT",
				message,
				senderUuid: "current-user-uuid", // 실제 사용자 UUID로 교체해야 합니다
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

			<div className="flex-1 space-y-4 overflow-y-auto p-4 md:space-y-6 md:p-8">
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
						className={`flex items-end gap-4 ${message.senderUuid === "current-user-uuid" ? "flex-row-reverse" : ""}`}>
						{message.senderUuid !== "current-user-uuid" && (
							<ChAvatar src={contact.avatarSrc} alt={contact.name} size="sm" />
						)}
						<ChMessageBubble
							content={message.message}
							timestamp={new Date(message.createdAt).toLocaleTimeString()}
							isOwn={message.senderUuid === "current-user-uuid"}
						/>
					</div>
				))}
			</div>

			<ChatInput onSendMessage={handleSendMessage} error={error} />
		</div>
	)
}
