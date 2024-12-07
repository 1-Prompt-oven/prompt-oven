import React, { Suspense } from "react"
import type { GetSellerProductListRequestType } from "@/types/product/productUpsertType"
import type { ProductListSearchParams } from "@/types/account/searchParams.ts"
import SpProductDashboard from "@/components/seller/organism/SpProduct-dashboard.tsx"
import { getSellerProductList } from "@/action/product/productAction.ts"
import PageLoader from "@/components/seller/atom/PageLoader.tsx"

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
		searchBar: searchParams.searchBar,
		sortOption: searchParams.sortOption,
		sortBy: searchParams.sortBy,
		enable: searchParams.enable,
		temporary: searchParams.temporary,
		cursorId: searchParams.cursorId,
		pageSize: parseInt(searchParams.pageSize as string, 10),
	}

	const initialData = (await getSellerProductList(request)).result

	return (
		<main className="min-h-screen bg-[#1B1818] p-8">
			<Suspense fallback={<PageLoader />}>
				<SpProductDashboard
					initialData={initialData}
					initialRequest={request}
				/>
			</Suspense>
		</main>
	)
}
