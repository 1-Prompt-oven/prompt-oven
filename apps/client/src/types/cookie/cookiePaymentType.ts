export interface CreateCookiePaymentRequest {
  memberUuid?: string;
  cookieAmount: number;
  totalAmount?: number;
  message?: string;
  orderId?: string;
  orderName?: string;
  paymentMethod?: string;
  paymentWay?: string;
  requestedAt?: string;
  approvedAt?: string;
}