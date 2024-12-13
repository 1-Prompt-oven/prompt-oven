export interface PaymentItemType {
	productUUID: string
	productName: string
	productPrice: string
}

export interface RequestPaymentType {
	memberUUID: string
	orderId: string //주문 ID
	orderName: string //주문서 이름
	requestedAt: string //결제 요청 시간
	approvedAt: string //결제 승인 시간
	paymentWay: string //결제 종류
	paymentMethod: string //결제 수단
	totalAmount: number //결제 금액
	message: string
	purchaseList: PaymentItemType[]
}

export interface PromptPurchasedProps {
	content: PromptPurchasedItemProps[]
	nextCursor: number
	hasNext: true
	pageSize: number
	page: number
}

export interface PromptPurchasedItemProps {
	id: number
	purchaseUuid: string
	memberUuid: string
	paymentId: number
	purchaseDate: string
	status: string
}

export interface PromptPurchaseShortProps {
	paymentId: number
	memberUuid: string
	totalAmount: number
	message: string
	orderId: string
	orderName: string
	paymentMethod: string
	paymentWay: string
	requestedAt: string
	approvedAt: string
}

export interface PromptPurchaseAllInfoProps {
	id: number
	purchaseUuid: string
	memberUuid: string
	paymentId: number
	purchaseDate: string
	status: string
	shortData: PromptPurchaseShortProps
}

export interface PromptPurchaseFinalInfoProps {
	purchaseList: PromptPurchaseAllInfoProps[]
	nextCursor: number
	hasNext: true
	pageSize: number
	page: number
}
