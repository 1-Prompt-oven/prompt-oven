import type {
	CreateProductRequestType,
	CreateProductTempRequestType,
	GetProductDetailRequestType,
	GetProductDetailResponseType,
	GetProductSellerRequestType,
	GetProductSellerResponseType,
	ModifyProductRequestType,
} from "@/types/product/productUpsertType.ts"
import type { CommonResType } from "@/types/common/responseType.ts"
import { actionHandler } from "@/action/actionHandler.ts"

export const getProductSeller = async (
	req: GetProductSellerRequestType,
): Promise<CommonResType<GetProductSellerResponseType>> => {
	return actionHandler<CommonResType<GetProductSellerResponseType>>({
		name: "getProductSeller",
		url: `/v1/product/${req.productUuid}/seller`,
		options: {
			method: "GET",
			cache: "no-cache",
		},
	})
}

export const getProductDetail = async (
	req: GetProductDetailRequestType,
): Promise<CommonResType<GetProductDetailResponseType>> => {
	return actionHandler<CommonResType<GetProductDetailResponseType>>({
		name: "getProductDetail",
		url: `/v1/product/${req.productUuid}`,
		options: {
			method: "GET",
			cache: "no-cache",
		},
	})
}

export const createProduct = async (
	req: CreateProductRequestType,
): Promise<CommonResType<object>> => {
	return actionHandler<CommonResType<object>>({
		name: "createProduct",
		url: "/v1/seller/product",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}

export const updateProduct = async (
	req: ModifyProductRequestType,
): Promise<CommonResType<object>> => {
	return actionHandler<CommonResType<object>>({
		name: "updateProduct",
		url: "/v1/seller/product",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
			method: "PUT",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}

// /v1/seller/product/temporary
export const createTempProduct = async (
	req: CreateProductTempRequestType,
): Promise<CommonResType<object>> => {
	return actionHandler<CommonResType<object>>({
		name: "createTempProduct",
		url: "/v1/seller/product/temporary",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}
