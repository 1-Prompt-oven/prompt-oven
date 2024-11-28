export interface OAuthUnRegisterRequest {
	provider: string
	providerId: string
	memberUUID: string
}

export interface OAuthRegisterRequest {
	provider: string
	providerId: string
	memberUUID: string
}

export interface OAuthSignInRequest {
	provider: string
	providerID: string
	email: string
}
export interface OAuthSignInResponse {
	accesstoken: string
	refreshtoken: string
	nickname: string
	role: string
	memberUUID: string
	failed: boolean
}

// export type SignInResponse = Omit<OAuthSignInResponse, 'failed'>

export interface SignInResponse {
  result: {
    accesstoken: string,
    refreshtoken: string,
    nickname: string,
    role: string,
    memberUUID: string
}
}