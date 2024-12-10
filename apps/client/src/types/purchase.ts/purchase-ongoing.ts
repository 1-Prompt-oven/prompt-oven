export interface PaymentItemType {
	productUUID: string
	productName: string
	productPrice: number
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
