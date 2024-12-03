"use server"

import type {
	CreateProductRequestType,
	CreateProductTempRequestType,
	CreateProductTempResponseType,
	GetProductDetailRequestType,
	GetProductDetailResponseType,
	GetProductSellerRequestType,
	GetProductSellerResponseType,
	ModifyProductRequestType,
} from "@/types/product/productUpsertType.ts"
import type { CommonResType } from "@/types/common/responseType.ts"
import { actionHandler } from "@/action/actionHandler.ts"
import { getAccessToken } from "@/lib/api/sessionExtractor.ts"
import { initializeHeaders } from "@/lib/api/headers.ts"

export const getProductSeller = async (
	req: GetProductSellerRequestType,
): Promise<CommonResType<GetProductSellerResponseType>> => {
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType<GetProductSellerResponseType>>({
		name: "getProductSeller",
		url: `/v1/product/${req.productUuid}/seller`,
		options: {
			headers,
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
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType<object>>({
		name: "createProduct",
		url: "/v1/seller/product",
		options: {
			headers,
			method: "POST",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}

export const updateProduct = async (
	req: ModifyProductRequestType,
): Promise<CommonResType<object>> => {
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType<object>>({
		name: "updateProduct",
		url: "/v1/seller/product",
		options: {
			headers,
			method: "PUT",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}

// /v1/seller/product/temporary
export const createTempProduct = async (req: CreateProductTempRequestType) => {
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType<CreateProductTempResponseType>>({
		name: "createTempProduct",
		url: "/v1/seller/product/temporary",
		options: {
			headers,
			method: "POST",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}
