import type { JWT } from "next-auth/jwt"

export interface RefreshResponse {
	result: {
		accessToken: string
		nickname: string
		role: string
	}
}

export interface ExtendedToken extends JWT {
	id?: string | number
	accesstoken?: string
	refreshtoken?: string
	nickname?: string
	role?: string
	tokenExpiration?: number
	error?: string
}