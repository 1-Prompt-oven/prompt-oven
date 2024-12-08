export interface BestCreatorDataTypes {
	id: number
	name: string
	rank: number
	rankChange?: number
	image: string
	creatorTag?: string
}
export interface BestCreatorDataType2 {
	memberUuid: string
	sellsCount: number
	ranking: number
	reviewAvg: number
	date: string
	rankingChange: number
	dailySellsCount: number
}

export interface BestCreatorCursorListTypes {
	content: BestCreatorDataTypes[]
	lastCreatedAt: string | null
	lastId: string | null
	hasNext: boolean
	pageSize: number
	page: number
	timeRange?: "daily" | "weekly" | "monthly"
}

export interface BestCreatorCursorListTypes2 {
	content: BestCreatorDataType2[]
	nextCursor: number
	hasNext: boolean
	pageSize: number
	page: number
}

