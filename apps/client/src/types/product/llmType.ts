// LLM 관리 API
// LLM 관리 관련 API endpoints
export interface GetLlmRequestType {
	// path
	llmId: number
}
export interface GetLlmResponseType {
	// query
	llmName: string
}

// LLM List 조회
export interface GetLlmListRequestType {
	llmType: string
}
export interface GetLlmListResponseType {
	llmId: number
	llmName: string
	llmType: string
}

// LLM 버전 관리
// LLM 버전 관리 API endpoints
export interface GetLlmVersionListRequestType {
	// LLM ID 매칭 정보 path
	// llmId = 1: Dall-E (image)
	// llmId = 2: GPT (text)
	llmId: number
}

export interface GetLlmVersionListResponseType {
	llmVersionId: number
	llmVersionName: string
}
