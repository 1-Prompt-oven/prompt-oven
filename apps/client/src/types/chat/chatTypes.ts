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
	page: number // page number {query}
}

export interface Message {
	id: string
	roomId: string
	messageType: string
	message: string
	senderUuid: string
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}
export interface MessagePaginationResponse {
	content: Message[]
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
// note: 실제로 받는지 확인해보기  -- 배열 타입으로 받음
export interface SendChatMessageResponseType {
	id: string
	roomId: string
	messageType: string
	message: string
	senderUuid: string
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}

// chat reactive API Types
export interface GetReactiveChatRoomListRequestType {
	userUuid: string
}
// note: 실제로 받는지 확인해보기
export interface GetReactiveChatRoomListResponseType {
	chatRoomId: string
	chatRoomName: string
	partnerUuid: string
	recentMessage: string
	recentMessageTime: string // ISO date string
}

export interface GetReactiveChatMessageRequestType {
	roomId: string
}
// note: 실제로 받는지 확인해보기  -- 배열 타입으로 받음
export interface GetReactiveChatMessageResponseType {
	id: string
	roomId: string
	messageType: string
	message: string
	senderUuid: string
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}
