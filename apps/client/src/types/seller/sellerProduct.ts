export type ProductSortOption =
	| "price_high_low"
	| "price_low_high"
	| "sells_high_low"
	| "sells_low_high"
	| "created_new_old"
	| "created_old_new"
export type ProductStatusOption = "all" | "draft" | "declined" | "approved"

export type Sort = "price" | "sells" | "createdAt"
export type SortDirection = "ASC" | "DESC"
