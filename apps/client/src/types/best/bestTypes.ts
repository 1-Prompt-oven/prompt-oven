export interface BestCreatorDataTypes {
	id: number
	name: string
	rank: number
	rankChange?: number
	image: string
	creatorTag?: string
}

// 개별 베스트 크리에이터 정보 api
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
	content: BestCreatorDataType2[]
	nextCursor: number
	hasNext: boolean
	pageSize: number
	page: number
}

// 크리에이터 페이징 정보 api
export interface BestCreatorCursorListTypes2 {
	content: RenderedRankingItemTypes[]
	nextCursor: number
	hasNext: boolean
	pageSize: number
	page: number
}

// 화면에 렌더링되는 베스트 크리에이터 정보 (개별 베스트 + 프로필)
export interface RenderedRankingItemTypes {
	memberUuid: string // 베스트
	ranking: number // 베스트
	rankingChange: number // 베스트
	dailySellsCount: number // 베스트
	reviewAvg: number // 베스트
	date: string // 베스트
	avatarImage: string // 프로필
	nickname: string // 프로필
	follower: number // 프로필
	hashTag: string | undefined // 프로필
	totalSales: number
	views: number
}

// 필요한 정보
// 랭킹 -> 베스트
// 순위 변동 -> 베스트
// 판매량-> 베스트
// 평균 별점 -> 베스트
// 선택된 날짜 -> 베스트
// --------------------------
// 프로필 사진 -> 프로필
// 닉네임 -> 프로필
// 팔로워 수 -> 프로필
// 해시태그 -> 프로필

