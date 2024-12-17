export interface GetCookieResultType {
    id: string; // Unique identifier for the cookie result
    paymentId: number; // Payment ID
    memberUuid: string; // UUID of the member
    cookieAmount: number; // Amount of cookies
    approvedAt: string; // Approval timestamp (ISO 8601 format)
    paymentType: "CHARGE" | "USE" | undefined; // Type of payment (e.g., CHARGE, REFUND)
    quantity: number; // Quantity associated with the cookie result
  }


