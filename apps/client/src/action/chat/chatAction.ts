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
} from "@/types/chat/chatTypes.ts"
import type { CommonResType } from "@/types/common/responseType.ts"
import { actionHandler } from "@/action/actionHandler.ts"
import { createQueryParamString } from "@/lib/query.ts"
import { getAccessToken } from "@/lib/api/sessionExtractor.ts"
import { initializeHeaders } from "@/lib/api/headers.ts"

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

// chat-reactive-controller
export const getReactiveChatRoomList = async (
	req: GetReactiveChatRoomListRequestType,
) => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)

	return actionHandler<GetReactiveChatRoomListResponseType[]>({
		name: "getReactiveChatRoomList",
		url: `/v1/member/chat/chatRoomList/${req.userUuid}`,
		options: {
			method: "GET",
			headers,
			cache: "no-cache",
		},
	})
}

export const getReactiveChatMessages = async (
	req: GetReactiveChatMessageRequestType,
) => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)

	return actionHandler<GetReactiveChatMessageResponseType[]>({
		name: "getReactiveChatMessages",
		url: `/v1/member/chat/new/${req.roomId}`,
		options: {
			method: "GET",
			headers,
			cache: "no-cache",
		},
	})
}
