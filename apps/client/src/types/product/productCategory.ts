// 카테고리 관리 API
// 카테고리 관련 API endpoints
// parentCategoryCode 미입력시 최상위 카테고리 리스트 조회
export interface GetCategoryListRequestType {
	// query
	parentCategoryUuid: string
}

export interface GetCategoryListResponseType {
	categoryName: "string"
	categoryUuid: "string"
}
