import { getSellerProductList } from "@/action/product/productAction.ts"
import { stringToBoolean } from "@/lib/utils.ts"
import type { ProductListSearchParams } from "@/types/account/searchParams.ts"
import type { GetSellerProductListRequestType } from "@/types/product/productUpsertType"
import SellorBoard from "./SellorBoard"

export interface SellerListProps {
	searchParams: ProductListSearchParams
	sellerName: string
	sellerUuid: string
}
export default async function SellerList({
	searchParams,
	sellerName,
	sellerUuid,
}: SellerListProps) {
	const request: GetSellerProductListRequestType = {
		sellerUuid,
		searchBar: searchParams.searchBar ?? "",
		sortOption: searchParams.sortOption,
		sortBy: searchParams.sortBy,
		// enable: stringToBoolean(searchParams.enable as string),
		enable: true,
		temporary: stringToBoolean(searchParams.temporary as string),
		page: parseInt(searchParams.page ?? "0", 10),
		size: parseInt(searchParams.size ?? "5", 10),
	}

	const initialData = (await getSellerProductList(request)).result

	return (
		<SellorBoard
			initialData={initialData}
			initialRequest={request}
			sellerName={sellerName}
		/>
	)
}
