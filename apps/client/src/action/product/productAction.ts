"use server"

import _ from "lodash"
import type {
	CreateProductRequestType,
	CreateProductTempRequestType,
	CreateProductTempResponseType,
	GetNotableProductListRequestType,
	GetNotableProductListResponseType,
	GetProductDetailRequestType,
	GetProductDetailResponseType,
	GetProductSellerRequestType,
	GetProductSellerResponseType,
	GetSellerProductListRequestType,
	GetSellerProductListResponseType,
	ModifyProductRequestType,
	RemoveProductRequestType,
} from "@/types/product/productUpsertType.ts"
import type { CommonResType } from "@/types/common/responseType.ts"
import { actionHandler } from "@/action/actionHandler.ts"
import { getAccessToken } from "@/lib/api/sessionExtractor.ts"
import { initializeHeaders } from "@/lib/api/headers.ts"
import { createQueryParamString } from "@/lib/query.ts"
import { getSellerShort } from "@/action/prompt-detail/getProductDetailData.ts"

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
			cache: "default",
		},
	})
}

export const getNotableProductList = async () => {
	"use server"
	const req: GetNotableProductListRequestType = {
		searchBar: "",
		topCategoryUuid: "",
		subCategoryUuid: "",
		minPrice: "",
		maxPrice: "",
		sortBy: "avgStar",
		sortOption: "DESC",
		pageSize: 12,
	}
	return getMainCarouselProductList(req)
}

export const getMainProductList = async () => {
	"use server"
	const req: GetNotableProductListRequestType = {
		searchBar: "",
		topCategoryUuid: "",
		subCategoryUuid: "",
		minPrice: "",
		maxPrice: "",
		sortBy: "sells",
		sortOption: "DESC",
		pageSize: 4,
	}
	return getMainCarouselProductList(req)
}
export const getMainCarouselProductList = async (
	req: GetNotableProductListRequestType,
) => {
	const headers = initializeHeaders()
	const productList = (
		await actionHandler<CommonResType<GetNotableProductListResponseType>>({
			name: "getMainCarouselProductList",
			url: `/v1/product/list?${createQueryParamString(req)}`,
			options: {
				headers,
				method: "GET",
				cache: "default",
			},
		})
	).result
	return Promise.all(
		productList.productList.map(async (product) => {
			const sellerUuid = await getProductSeller({
				productUuid: product.productUuid,
			})
			const seller = await getSellerShort(sellerUuid.result.sellerUuid)

			return {
				...product,
				author: seller,
			}
		}),
	)
}

export const getSellerProductList = async (
	req: GetSellerProductListRequestType,
): Promise<CommonResType<GetSellerProductListResponseType>> => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	const query = createQueryParamString(_.omit(req, ["sellerUuid"]))
	return actionHandler<CommonResType<GetSellerProductListResponseType>>({
		name: "getSellerProductList",
		url: `/v1/product/${req.sellerUuid}/list?${query}`,
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

export const deleteProduct = async (rea: RemoveProductRequestType) => {
	"use server"
	const accessToken = await getAccessToken()
	const headers = initializeHeaders(accessToken ?? undefined)
	return actionHandler<CommonResType<object>>({
		name: "deleteProduct",
		url: `/v1/seller/product/${rea.productUuid}`,
		options: {
			headers,
			method: "DELETE",
			cache: "no-cache",
		},
	})
}
