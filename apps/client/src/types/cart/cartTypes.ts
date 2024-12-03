export interface CartItemType {
	id: number
	memberUuid: string
	productUuid: string
	selected: boolean
	deleted?: boolean
	productName: string
	thumbnailUrl: string
	price: number
	llmName: string
}

