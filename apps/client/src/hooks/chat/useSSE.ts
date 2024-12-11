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

import { useCallback, useEffect, useRef, useState } from "react"
import type { GetReactiveChatMessageResponseType } from "@/types/chat/chatTypes.ts"
import { getReactiveChatMessages } from "@/action/chat/chatAction.ts"

const useSSE = (roomId: string) => {
	// console.log("start useSSE: ", roomId)
	const [messages, setMessages] = useState<
		GetReactiveChatMessageResponseType[]
	>([])
	const [error, setError] = useState<string | null>(null)
	const readerRef =
		useRef<ReadableStreamDefaultReader<GetReactiveChatMessageResponseType> | null>(
			null,
		)

	const cancelStream = useCallback(() => {
		if (readerRef.current) {
			readerRef.current.cancel().then()
			readerRef.current = null
		}
	}, [])

	useEffect(() => {
		let isMounted = true

		const fetchSSE = async () => {
			try {
				const stream = await getReactiveChatMessages({ roomId })
				// eslint-disable-next-line no-console -- This is a server-side only log
				console.log("processStream in useSSE: ", stream)
				readerRef.current = stream.getReader()

				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,no-constant-condition -- It is necessary to keep the loop running
				while (true) {
					// eslint-disable-next-line no-await-in-loop -- This is a server-side only code
					const { done, value } = await readerRef.current.read()
					if (done) break
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- It is necessary to check if the value is truthy
					if (isMounted && value) {
						setMessages((prevMessages) => [...prevMessages, value])
					}
				}
			} catch (err) {
				if (isMounted) {
					// eslint-disable-next-line no-console -- This is a server-side only log
					console.error("SSE error:", err)
					setError("채팅 서버 연결에 실패했습니다")
				}
			} finally {
				if (readerRef.current) {
					readerRef.current.releaseLock()
				}
			}
		}

		fetchSSE().then()

		return () => {
			isMounted = false
			cancelStream()
		}
	}, [roomId])

	return { messages, error }
}

export default useSSE

/*

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

 */
