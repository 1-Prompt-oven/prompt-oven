import type { GetCookieResultType } from "./cookieTableType"

export interface GetCookieListRequestType {
	userUuid: string
	startDate?: string
	endDate?: string
	paymentType?: "USE" | "CHARGE" // 정렬 기준
	lastId?: string
	pageSize?: number
}

export interface GetCookieListResponseType {
	content: GetCookieResultType[]
	nextCursor: string | null
	hasNext: boolean
	pageSize: number
	page: number
}

// export interface GetCookieResultType {
// 	id: string; // Unique identifier for the cookie result
// 	paymentId: number; // Payment ID
// 	memberUuid: string; // UUID of the member
// 	cookieAmount: number; // Amount of cookies
// 	approvedAt: string; // Approval timestamp (ISO 8601 format)
// 	paymentType: "CHARGE" | "USE"; // Type of payment (e.g., CHARGE, REFUND)
// 	quantity: number; // Quantity associated with the cookie result
// }


export interface CookieLatestType {
	isUser: boolean
	count: number
}
