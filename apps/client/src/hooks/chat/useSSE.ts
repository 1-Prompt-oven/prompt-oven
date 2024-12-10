// hooks/useSSE.ts

/*

This custom hook, `useSSE`, does the following:

- It takes a `roomId` as a parameter to establish a connection specific to a chat room.
- It uses the `EventSource` API to create an SSE connection to the server.
- It manages the state of received messages and any potential errors.
- The `onmessage` event handler parses incoming messages and adds them to the state.
- The `onerror` event handler manages connection errors.
- The hook cleans up the connection when the component unmounts.

 */

import { useEffect, useState } from "react"
import type { GetReactiveChatMessageResponseType } from "@/types/chat/chatTypes"

const useSSE = (roomId: string) => {
	const [messages, setMessages] = useState<
		GetReactiveChatMessageResponseType[]
	>([])
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const eventSource = new EventSource(`/api/chat/sse?roomId=${roomId}`)

		eventSource.onmessage = (event) => {
			// eslint-disable-next-line no-console -- This is a client-side only log
			console.log("event.data", event.data)
			const newMessage = JSON.parse(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- This is a server-side only code
				event.data,
			) as GetReactiveChatMessageResponseType
			setMessages((prevMessages) => [...prevMessages, newMessage])
		}

		eventSource.onerror = (err: Event) => {
			// eslint-disable-next-line no-console -- This is a server-side only log
			console.error("SSE error:", err)
			setError(`채팅 서버 연결에 실패했습니다. 상태: ${eventSource.readyState}`)
			if (eventSource.readyState === EventSource.CLOSED) {
				// eslint-disable-next-line no-console -- This is a server-side only log
				console.log("SSE 연결이 닫혔습니다.")
			}
			eventSource.close()
		}

		eventSource.onopen = () => {
			// eslint-disable-next-line no-console -- This is a server-side only log
			console.log("SSE 연결이 열렸습니다.")
		}

		return () => {
			eventSource.close()
		}
	}, [roomId])

	return { messages, error }
}

export default useSSE
