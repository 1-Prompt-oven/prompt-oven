// Create Chat Room API Types
export interface CreateChatRoomRequestType {
	hostUserUuid: string
	inviteUserUuid: string
	roomName: string
}
export interface CreateChatRoomResponseType {
	roomId: string
	roomName: string
	createdAt: string // ISO date string  "2024-12-10T04:48:38.205Z"
	updatedAt: string // ISO date string  "2024-12-10T04:48:38.205Z"
}

// Get Chat Message API Types
export interface GetPreviousMessagesRequestType {
	roomId: string // chat room id {path}
	lastObjectId: string // last message id {query}
	pageSize: number // number of messages to fetch {query}
	page?: number // page number {query}
}

export interface ChatMessage {
	id: string
	roomId: string
	messageType: string
	message: string
	senderUuid: string
	isRead: boolean
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}
export interface ChatRoom {
	chatRoomId: string
	chatRoomName: string
	partnerUuid: string
	partnerIsActive: boolean
	recentMessage: string
	recentMessageTime: string // ISO date string
	unreadCount: number
}

export interface MessagePaginationResponse {
	content: ChatMessage[]
	lastObjectId: string
	hasNext: boolean
	pageSize: number
	page: number
}
export type GetPreviousMessagesResponseType = MessagePaginationResponse

// Send Chat Message API Types
export interface SendChatMessageRequestType {
	roomId: string
	messageType: string
	message: string
	senderUuid: string
}
export interface SendChatMessageResponseType {
	id: string
	roomId: string
	messageType: string
	message: string
	senderUuid: string
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}

export interface UpdateRoomReadRequestType {
	roomId: string // chat room id {path}
	userUuid: string // user uuid {query}
}

export interface LeaveRoomRequestType {
	roomId: string // chat room id {path}
	userUuid: string // user uuid {query}
}

export interface GetChatRoomRequestType {
	roomId: string // chat room id {path}
	userUuid: string // user uuid {query}
}
export type GetChatRoomResponseType = ChatRoom

export interface GetChatRoomListRequestType {
	userUuid: string // user uuid {path}
}
export type GetChatRoomListResponseType = ChatRoom[]

// chat reactive API Types
export type GetReactiveChatRoomListResponseType = ChatRoom
