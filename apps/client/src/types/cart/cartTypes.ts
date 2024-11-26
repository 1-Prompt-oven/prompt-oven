export interface CartItemApiResponseType {
	itemId: string
	memberUuid: string
	selected: boolean
	deleted?: boolean
}

export interface CartItemType {
	itemId: string
	memberUuid: string
	selected: boolean
	deleted?: boolean
	productName: string
	productImage: string
	productPrice: number
}
