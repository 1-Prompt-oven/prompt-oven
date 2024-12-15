'use server'
import { initializeHeaders } from '@/lib/api/headers';
import { getAccessToken, getMemberUUID } from '@/lib/api/sessionExtractor';
import type { CreateCookiePaymentRequest } from '@/types/cookie/cookiePaymentType';
import { getDummyCookiePaymentData } from '@/types/cookie/cookiePayment';
import { actionHandlerNoresponse } from '../actionHandler';

export const createCookiePayment = async (
  paymentData: CreateCookiePaymentRequest,
): Promise<undefined> => {
  const userUuid = await getMemberUUID();
  if (!userUuid) {
    throw new Error("Unable to fetch user UUID");
  }

  const queryParams = new URLSearchParams({
    memberUuid: userUuid,
  }).toString();

  const accessToken = await getAccessToken();
  const headers = initializeHeaders(accessToken ?? undefined);
  const dummyData = getDummyCookiePaymentData(paymentData.cookieAmount);
  const body = {
    memberUuid: userUuid,
    cookieAmount: paymentData.cookieAmount || "",
    totalAmount: dummyData.totalAmount,
    message: dummyData.message,
    orderId: dummyData.orderId,
    orderName: dummyData.orderName,
    paymentMethod: dummyData.paymentMethod,
    paymentWay: dummyData.paymentWay,
    requestedAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
  };

  await actionHandlerNoresponse<undefined>({
    name: "createCookiePayment",
    url: `/v1/payment/cookie?${queryParams}`,
    options: {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    },
  });
};

