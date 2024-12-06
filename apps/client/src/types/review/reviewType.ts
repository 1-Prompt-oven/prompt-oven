export interface PromptSimpleReviewData {
	productUuid: string
	avgStar: number
	reviewCount: number
}

export interface PromptReviewType {
	content: ReviewContentType[]
	lastCreatedAt: string // ISO 8601 형식의 날짜 문자열
	lastId: number // 마지막 ID
	hasNext: boolean // 다음 페이지 존재 여부
	pageSize: number // 페이지 크기
	page: number // 현재 페이지 번호
}

export interface ReviewContentType {
	id: string
	productUuid: string
	contents: string
	star: number
	authorUuid: string
	authorProfileImage: string
	authorNickname: string
	createdAt: string
	updatedAt: string
}
