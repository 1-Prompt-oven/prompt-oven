export type ProductSortOption =
	| "price_high_low"
	| "price_low_high"
	| "sells_high_low"
	| "sells_low_high"
	| "created_new_old"
	| "created_old_new"
export type ProductStatusOption = "draft" | "declined" | "approved" // "all" |  <-- 현재는 적용할 수 없음

export type Sort = "price" | "sells" | "createdAt"
export type SortDirection = "ASC" | "DESC"
