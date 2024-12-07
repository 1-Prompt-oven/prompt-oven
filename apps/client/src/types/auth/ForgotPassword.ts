export interface EmailPayload {
  email: string;
}

export interface EmailCheckPayload extends EmailPayload {
  code: string;
}

export interface ResetPasswordPayload extends EmailPayload {
  password: string;
}
