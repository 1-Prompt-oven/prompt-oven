import type { ProductStatusOption } from "@/types/seller/sellerProduct.ts"
import type {
	AccountQueryParams,
	ProductListSearchParams,
} from "@/types/account/searchParams.ts"

export const extractProductStatusOption = (status: ProductStatusOption) => {
	let enable: boolean | undefined
	let temporary: boolean | undefined

	switch (status) {
		case "draft":
			temporary = true
			enable = false
			break
		case "approved":
			temporary = false
			enable = true
			break
		case "declined":
			temporary = false
			enable = false
			break
		// case "all":
		// 	temporary = true
		// 	enable = true
		// 	break
	}

	return { enable, temporary }
}

export const extractProductStatusOptionReverse = (obj: {
	enable: boolean
	temporary: boolean
}) => {
	const { enable, temporary } = obj
	let status: ProductStatusOption

	if (temporary) {
		status = "draft"
	} else if (enable) {
		status = "approved"
	} else {
		status = "declined"
	}

	return status
}

export const getSellerProductSearchParams = (
	searchParams: AccountQueryParams,
): ProductListSearchParams => {
	const { sortOption, searchBar, sortBy, enable, temporary, page, size } =
		searchParams

	return {
		sortOption: sortOption ?? "createdAt",
		searchBar: searchBar ?? "",
		sortBy: sortBy ?? "DESC",
		enable: enable ?? "true",
		temporary: temporary ?? "false",
		page: page ?? "0",
		size: size ?? "8",
	}
}
