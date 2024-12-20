export interface RegisterOAuthMemberRequest {
	email: string
	password?: string
	nickname?: string
	provider: string
	providerId: string
}

export interface RegisterOAuthMemberResponse {
	accesstoken: string
	refreshtoken: string
	nickname: string
	role: string
	memberUUID: string
}

export interface ResgisterEmailCheckResponse {
  httpStatus: string,
  isSuccess: boolean,
  message: string,
  result: boolean
}
