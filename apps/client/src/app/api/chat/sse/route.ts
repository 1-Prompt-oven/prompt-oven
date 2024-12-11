// // app/api/chat/sse/route.ts
// /*
// This API route does the following:
//
// - It extracts the `roomId` from the query parameters.
// - It creates a `ReadableStream` that will be used to send SSE events.
// - It defines a `sendMessage` function to format and send SSE events.
// - It implements a `fetchAndSendMessages` function that fetches new messages from the Java Spring backend and sends them as SSE events.
// - It sets up an interval to poll for new messages every 5 seconds (you can adjust this interval as needed).
// - It returns a `NextResponse` with the appropriate headers for SSE.
//  */
//
// import type { NextRequest } from "next/server"
// import { NextResponse } from "next/server"
// import { getReactiveChatMessages } from "@/action/chat/chatAction.ts"
//
// export async function GET(req: NextRequest) {
// 	const roomId = req.nextUrl.searchParams.get("roomId")
//
// 	if (!roomId) {
// 		return NextResponse.json({ error: "Room ID is required" }, { status: 400 })
// 	}
//
// 	const encoder = new TextEncoder()
//
// 	const stream = new ReadableStream({
// 		async start(controller) {
// 			const sendMessage = (data: string) => {
// 				controller.enqueue(encoder.encode(`data: ${data}\n\n`))
// 			}
//
// 			const fetchAndSendMessages = async () => {
// 				try {
// 					const messages = await getReactiveChatMessages({ roomId })
// 					messages.forEach((message) => {
// 						sendMessage(JSON.stringify(message))
// 					})
// 				} catch (error) {
// 					// eslint-disable-next-line no-console -- This is a server-side only log
// 					console.error("Error fetching messages:", error)
// 				}
// 			}
//
// 			// Initial fetch
// 			await fetchAndSendMessages()
//
// 			// Poll for new messages every 5 seconds
// 			const intervalId = setInterval(fetchAndSendMessages, 5000)
//
// 			// Cleanup function
// 			return () => {
// 				clearInterval(intervalId)
// 			}
// 		},
// 	})
//
// 	return new NextResponse(stream, {
// 		headers: {
// 			"Content-Type": "text/event-stream",
// 			"Cache-Control": "no-cache",
// 			Connection: "keep-alive",
// 		},
// 	})
// }
