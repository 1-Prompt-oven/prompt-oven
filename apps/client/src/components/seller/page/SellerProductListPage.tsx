import React from "react"
import type { GetSellerProductListRequestType } from "@/types/product/productUpsertType"
import type { ProductListSearchParams } from "@/types/account/searchParams.ts"
import SpProductDashboard from "@/components/seller/organism/SpProductDashboard.tsx"
import { getSellerProductList } from "@/action/product/productAction.ts"
import { stringToBoolean } from "@/lib/utils.ts"

export interface SellerProductListPageProps {
	searchParams: ProductListSearchParams
	sellerUuid: string
}
export default async function SellerProductListPage({
	searchParams,
	sellerUuid,
}: SellerProductListPageProps) {
	const request: GetSellerProductListRequestType = {
		sellerUuid,
		searchBar: searchParams.searchBar ?? "",
		sortOption: searchParams.sortOption,
		sortBy: searchParams.sortBy,
		enable: stringToBoolean(searchParams.enable as string),
		temporary: stringToBoolean(searchParams.temporary as string),
		page: parseInt(searchParams.page ?? "0", 10),
		size: parseInt(searchParams.size ?? "8", 10),
	}

	const initialData = (await getSellerProductList(request)).result

	return (
		<SpProductDashboard initialData={initialData} initialRequest={request} />
	)
}
