"use server"

import _ from "lodash"
import type {
	CreateChatRoomRequestType,
	CreateChatRoomResponseType,
	GetPreviousMessagesRequestType,
	GetPreviousMessagesResponseType,
	LeaveRoomRequestType,
	SendChatMessageRequestType,
	SendChatMessageResponseType,
	UpdateRoomReadRequestType,
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
	const query = createQueryParamString(_.omit(req, ["roomId", "page"]))

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
			headers,
			method: "POST",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}

export const UpdateRoomRead = async (req: UpdateRoomReadRequestType) => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	const query = createQueryParamString(_.omit(req, ["roomId"]))

	return actionHandler<CommonResType<object>>({
		name: "UpdateRoomRead",
		url: `/v1/member/chat/updateRead/${req.roomId}?${query}`,
		options: {
			method: "PUT",
			headers,
			cache: "no-cache",
		},
	})
}

export const leaveChatRoom = async (req: LeaveRoomRequestType) => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	const query = createQueryParamString(_.omit(req, ["roomId"]))

	return actionHandler<CommonResType<object>>({
		name: "leaveChatRoom",
		url: `/v1/member/chat/${req.roomId}?${query}`,
		options: {
			method: "DELETE",
			headers,
			cache: "no-cache",
		},
	})
}
