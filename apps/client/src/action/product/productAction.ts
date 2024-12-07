"use server"

import type {
	CreateProductRequestType,
	CreateProductTempRequestType,
	CreateProductTempResponseType,
	GetProductDetailRequestType,
	GetProductDetailResponseType,
	GetProductSellerRequestType,
	GetProductSellerResponseType,
	GetSellerProductListRequestType,
	GetSellerProductListResponseType,
	ModifyProductRequestType,
} from "@/types/product/productUpsertType.ts"
import type { CommonResType } from "@/types/common/responseType.ts"
import { actionHandler } from "@/action/actionHandler.ts"
import { getAccessToken } from "@/lib/api/sessionExtractor.ts"
import { initializeHeaders } from "@/lib/api/headers.ts"

export const getProductSeller = async (
	req: GetProductSellerRequestType,
): Promise<CommonResType<GetProductSellerResponseType>> => {
	"use server"
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

export const getSellerProductList = async (
	req: GetSellerProductListRequestType,
): Promise<CommonResType<GetSellerProductListResponseType>> => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType<GetSellerProductListResponseType>>({
		name: "getSellerProductList",
		url: `/v1/product/${req.sellerUuid}/list`,
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
	"use server"
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
	"use server"
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
	"use server"
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
	"use server"
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
