import type { EmailCheckPayload, EmailPayload, ResetPasswordPayload } from '@/types/auth/ForgotPassword';
import { actionHandler, actionHandlerNoresponse } from '../actionHandler';

export const requestPasswordResetEmail = async (
  data: EmailPayload,
): Promise<undefined> => {
  await actionHandlerNoresponse<undefined>({
    name: "requestPasswordResetEmail",
    url: "/v1/auth/email/request",
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

export const checkEmailVerificationCode = async (
  data: EmailCheckPayload,
): Promise<boolean> => {
  return actionHandler<boolean>({
      name: "checkEmailVerificationCode",
      url: "/v1/auth/email/check",
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

export const resetPassword = async (
  data: ResetPasswordPayload,
): Promise<undefined> => {
  return actionHandlerNoresponse<undefined>({
    name: "resetPassword",
    url: "/v1/auth/resetPW",
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
