export interface RegisterSellerRequestType {
	memberID: string
	taxID: string
	accountID: string
	bankName: string
	phone: string
	postcode: string
	address: string
}

export interface GetSellerRequestType {
	// (path)
	memberUUID: string
}
export interface GetSellerResponseType {
	memberID: string
	settlementProfileID: string
	accountID: string
	bankName: string
	phone: string
	postcode: string
	address: string
}
