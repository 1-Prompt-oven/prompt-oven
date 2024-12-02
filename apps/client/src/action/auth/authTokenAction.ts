import type { RefreshResponse } from '@/types/auth/AuthToken';
import { actionHandler } from '../actionHandler';

export const refreshAccessToken = async (refreshToken: string): Promise<RefreshResponse> => {
  const response = await actionHandler<RefreshResponse>({
      name: "refreshAccessToken",
      url: `/v1/auth/refresh`,
      options: {
          method: "GET",
          cache: "no-cache",
          headers: {
              Refreshtoken: `Bearer ${refreshToken}`,
          },
      },
  });
  return response;
};