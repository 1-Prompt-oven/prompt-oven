export interface PaymentItemType {
	productUUID: string
	productName: string
	productPrice: string
}

export interface RequestPaymentType {
	memberUUID: string
	paymentMethod: string
	purchaseList: PaymentItemType[]
	itemCount: number
	totalPrice: number
	message: string
}
