export interface AuthMemberType {
	accessToken: string
	refreshToken: string
	nickname: string
	signinEmail: string
}

export interface SignInType {
	email: string
	password: string
}

export interface LogoutRequest {
  Authorization: string;
  Refreshtoken: string;
}

export interface LogoutResponse {
  httpStatus: string;
  isSuccess: boolean;
  message: string;
  result: object;
}

export interface VerifyNicknameRequest {
  nickname: string;
}

export interface VerifyNicknameResponse {
  httpStatus: string;
  isSuccess: boolean;
  message: string;
  result: boolean;
}

export interface VerifyEmailRequest {
  email: string;
}

export interface VerifyEmailResponse {
  httpStatus: string;
  isSuccess: boolean;
  message: string;
  result: boolean;
}