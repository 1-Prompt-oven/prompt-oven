export interface PromptsType {
	productList: PromptItemType[]
	nextCursorId: string
	hasNext: boolean
}

export interface PromptItemType {
	productUuid: string
	productName: string
	price: number
	topCategoryUuid: string
	subCategoryUuid: string
	enabled: boolean // boolean으로 변경
	avgStar: number
	sells: number
	likeCount: number
	llmId: number
	description: string
	discountRate: number
	reviewCount: number
	createdAt: string
	thumbnailUrl?: string
	llmName?: string
}

export interface LLMNameType {
	llmName: string
}

export interface PropmtsSearchParamsProps {
	searchBar?: string // 검색어
	topCategoryUuid?: string // 상위 카테고리 UUID
	topCategoryName?: string
	subCategoryUuid?: string // 하위 카테고리 UUID
	subCategoryName?: string
	minPrice?: string // 최소 가격
	maxPrice?: string // 최대 가격
	sortBy?: string // 정렬 기준
	sortOption?: string // 정렬 옵션 (예: ASC, DESC)
}
