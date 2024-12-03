import type { RegisterOAuthMemberRequest, RegisterOAuthMemberResponse } from "@/types/auth/memberRegisterType.ts"
import type { LogoutRequest, LogoutResponse, VerifyEmailRequest, VerifyEmailResponse, VerifyNicknameRequest, VerifyNicknameResponse } from '@/types/auth/AuthMemberType';
import { actionHandler } from "@/action/actionHandler.ts"

export const registerOauthMember = async (reqBody: RegisterOAuthMemberRequest) => {
	return actionHandler<RegisterOAuthMemberResponse>({
		name: "registerOauthMember",
		url: "/v1/auth/register-social",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(reqBody),
			cache: "no-cache",
		},
	})
}

export const registerAuthMember = async (
	data: RegisterOAuthMemberResponse,
): Promise<Response> => {
	return actionHandler<Response>({
		name: "registerAuthMember",
		url: "/v1/auth/register",
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			cache: "no-cache",
		},
	});
};

export const logoutAuthMember = async (data: LogoutRequest): Promise<LogoutResponse> => {
  return actionHandler<LogoutResponse>({
    name: "logoutAuthMember",
    url: "/v1/auth/logout",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: data.Authorization,
        Refreshtoken: data.Refreshtoken,
      },
      cache: "no-cache",
    },
  }).then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });
};


export const verifyNickname = async (
  data: VerifyNicknameRequest
): Promise<VerifyNicknameResponse> => {
  return actionHandler<VerifyNicknameResponse>({
    name: "verifyNickname",
    url: "/v1/auth/verify/nickname",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    },
  });
};

export const verifyEmail = async (
  data: VerifyEmailRequest
): Promise<VerifyEmailResponse> => {
  return actionHandler<VerifyEmailResponse> ({
    name: "verifyEmail",
		url: "/v1/auth/verify/email",
    options:{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
			}
  });
};