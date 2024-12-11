/* eslint-disable -- 임시방편 */

"use client"

// hooks/useSSE.ts
import { useCallback, useEffect, useState } from "react"

interface UseSSEOptions {
	url: string
	onMessage: (data: any) => void
	onError?: (error: Event) => void
}

export function useChatMessageES({ url, onMessage, onError }: UseSSEOptions) {
	const [eventSource, setEventSource] = useState<EventSource | null>(null)

	const connect = useCallback(() => {
		const newEventSource = new EventSource(url)

		newEventSource.onmessage = (event) => {
			// console.log("onmessage", event.data)

			const data = JSON.parse(event.data)
			onMessage(data)
		}

		newEventSource.onerror = (error) => {
			// console.error("SSE 연결 오류:", error)
			if (onError) {
				onError(error)
			}
			newEventSource.close()
		}

		setEventSource(newEventSource)
	}, [url, onMessage, onError])

	useEffect(() => {
		connect()

		return () => {
			if (eventSource) {
				eventSource.close()
			}
		}
	}, [connect])

	const reconnect = useCallback(() => {
		if (eventSource) {
			eventSource.close()
		}
		connect()
	}, [eventSource, connect])

	return { reconnect }
}
