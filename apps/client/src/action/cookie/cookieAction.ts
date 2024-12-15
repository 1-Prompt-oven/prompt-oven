"use server"
import { initializeHeaders } from '@/lib/api/headers'
import { getAccessToken, getMemberUUID } from '@/lib/api/sessionExtractor'
import type { CommonResType } from '@/types/common/responseType'
import type { GetCookieListRequestType, GetCookieListResponseType } from '@/types/cookie/cookieResponseType'
import { actionHandler } from '../actionHandler'

export const getCookieList = async (
  req: GetCookieListRequestType
): Promise<CommonResType<GetCookieListResponseType>> => {
  const userUuid = await getMemberUUID();
  if (!userUuid) {
    throw new Error("Unable to fetch user UUID");
  }
  const accessToken = await getAccessToken();
  const headers = initializeHeaders(accessToken ?? undefined);

  const queryParams = new URLSearchParams({
    memberUuid: userUuid,
    startDate: req.startDate || "",
    endDate: req.endDate || "",
    paymentType: req.paymentType || "",
    lastId: req.lastId || "",
    pageSize: req.pageSize?.toString() || "",
  }).toString();

  return actionHandler<CommonResType<GetCookieListResponseType>>({
    name: "getcookieList",
    url: `/v1/member/cookie?${queryParams}`, 
    options: {
      headers,
      method: "GET",
      cache: "no-cache",
    },
  });
};


