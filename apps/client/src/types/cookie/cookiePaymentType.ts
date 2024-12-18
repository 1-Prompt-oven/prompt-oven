export interface CreateCookiePaymentRequest {
  memberUuid?: string;
  orderId?: string;
  orderName?: string;
  paymentWay?: string;
  paymentMethod?: string;
  cookieAmount: number;
  totalAmount?: number;
  message?: string;
}