"use server"

import _ from "lodash"
import type {
	CreateChatRoomRequestType,
	CreateChatRoomResponseType,
	GetPreviousMessagesRequestType,
	GetPreviousMessagesResponseType,
	GetReactiveChatMessageRequestType,
	GetReactiveChatMessageResponseType,
	GetReactiveChatRoomListRequestType,
	GetReactiveChatRoomListResponseType,
	SendChatMessageRequestType,
	SendChatMessageResponseType,
	UpdateRoomReadRequestType,
} from "@/types/chat/chatTypes.ts"
import type { CommonResType } from "@/types/common/responseType.ts"
import { actionHandler } from "@/action/actionHandler.ts"
import { createQueryParamString } from "@/lib/query.ts"
import { getAccessToken } from "@/lib/api/sessionExtractor.ts"
import { initHeaders, initializeHeaders } from "@/lib/api/headers.ts"

// chat-controller
export const createChatRoom = async (req: CreateChatRoomRequestType) => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType<CreateChatRoomResponseType>>({
		name: "createChatRoom",
		url: `/v1/member/chat/createRoom`,
		options: {
			method: "POST",
			body: JSON.stringify(req),
			headers,
			cache: "no-cache",
		},
	})
}

export const getPreviousChatMessages = async (
	req: GetPreviousMessagesRequestType,
) => {
	"use server"
	const roomId = req.roomId
	const query = createQueryParamString(_.omit(req, ["roomId"]))

	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)

	return actionHandler<CommonResType<GetPreviousMessagesResponseType>>({
		name: "getPreviousChatMessages",
		url: `/v1/member/chat/previous/${roomId}?${query}`,
		options: {
			method: "GET",
			headers,
			cache: "no-cache",
		},
	})
}

export const sendChatMessage = async (req: SendChatMessageRequestType) => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<SendChatMessageResponseType>({
		name: "sendChatMessage",
		url: `/v1/member/chat/send`,
		options: {
			method: "POST",
			body: JSON.stringify(req),
			headers,
			cache: "no-cache",
		},
	})
}

export const UpdateRoomRead = async (req: UpdateRoomReadRequestType) => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	const query = createQueryParamString(_.omit(req, ["roomId"]))

	return actionHandler<SendChatMessageResponseType>({
		name: "sendChatMessage",
		url: `/v1/member/chat/updateRead/${req.roomId}?${query}`,
		options: {
			method: "PUT",
			body: JSON.stringify(req),
			headers,
			cache: "no-cache",
		},
	})
}

// chat-reactive-controller
export async function getReactiveChatMessages(
	req: GetReactiveChatMessageRequestType,
): Promise<ReadableStream<GetReactiveChatMessageResponseType>> {
	const accessToken = await getAccessToken()
	const headers = initHeaders(accessToken ?? "", "none")
	headers.set("Accept", "*/*")
	headers.set("Accept-Encoding", "gzip, deflate, br")
	headers.set("Connection", "keep-alive")

	const response = await fetch(
		`${process.env.API_BASE_URL}/v1/member/chat/new/${req.roomId}`,
		{
			method: "GET",
			headers,
			cache: "no-store",
		},
	)

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	if (!response.body) {
		throw new Error("No response body")
	}

	return response.body.pipeThrough(new TextDecoderStream()).pipeThrough(
		new TransformStream({
			transform(chunk, controller) {
				const lines = chunk.split("\n")
				lines.forEach((line) => {
					if (line.startsWith("data:")) {
						try {
							const data = JSON.parse(line.slice(5))
							// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- This is a server-side only code
							controller.enqueue(data)
						} catch (e) {
							// eslint-disable-next-line no-console -- This is a server-side only log
							console.error("Error parsing SSE data:", e)
						}
					}
				})
			},
		}),
	)
}

export async function getReactiveChatRoomList(
	req: GetReactiveChatRoomListRequestType,
): Promise<ReadableStream<GetReactiveChatRoomListResponseType>> {
	const accessToken = await getAccessToken()
	const headers = initHeaders(accessToken ?? "", "none")
	headers.set("Accept", "*/*")
	headers.set("Accept-Encoding", "gzip, deflate, br")
	headers.set("Connection", "keep-alive")

	const response = await fetch(
		`${process.env.API_BASE_URL}/v1/member/chat/chatRoomList/${req.userUuid}`,
		{
			method: "GET",
			headers,
			cache: "no-store",
		},
	)

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	if (!response.body) {
		throw new Error("No response body")
	}

	return response.body.pipeThrough(new TextDecoderStream()).pipeThrough(
		new TransformStream({
			transform(chunk, controller) {
				const lines = chunk.split("\n")
				lines.forEach((line) => {
					if (line.startsWith("data:")) {
						try {
							const data = JSON.parse(line.slice(5))
							// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- This is a server-side only code
							controller.enqueue(data)
						} catch (e) {
							// eslint-disable-next-line no-console -- This is a server-side only log
							console.error("Error parsing SSE data:", e)
						}
					}
				})
			},
		}),
	)
}

// export const getReactiveChatRoomList = async (
// 	req: GetReactiveChatRoomListRequestType,
// ) => {
// 	"use server"
// 	const accessToken = await getAccessToken()
// 	const headers = initHeaders(accessToken ?? undefined)
//
// 	return actionHandler<GetReactiveChatRoomListResponseType[]>({
// 		name: "getReactiveChatRoomList",
// 		url: `/v1/member/chat/chatRoomList/${req.userUuid}`,
// 		options: {
// 			method: "GET",
// 			headers,
// 			cache: "no-cache",
// 		},
// 	})
// }
//
// export const getReactiveChatMessages = async (
// 	req: GetReactiveChatMessageRequestType,
// ) => {
// 	"use server"
// 	const accessToken = await getAccessToken()
// 	const headers = initHeaders(accessToken ?? undefined)
//
// 	return actionHandler<GetReactiveChatMessageResponseType[]>({
// 		name: "getReactiveChatMessages",
// 		url: `/v1/member/chat/new/${req.roomId}`,
// 		options: {
// 			method: "GET",
// 			headers,
// 			cache: "no-cache",
// 		},
// 	})
// }
