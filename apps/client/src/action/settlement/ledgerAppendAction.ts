"use server"

import { getAuthHeaders } from "@/lib/api/headers";
import type { PaymentItemType } from "@/types/purchase.ts/purchase-ongoing";
import { isValidResponse } from "@/lib/api/validation";

// Define the seller response type
interface SellerResponse {
    sellerUuid: string;
}

export async function appendLedger(payload: PaymentItemType[]) {
    "use server"
    const headers = await getAuthHeaders()

    // Transform payload items with seller information
    const transformedPayload = await Promise.all(payload.map(async (item) => {
        // Fetch seller UUID for each product
        const sellerRes = await fetch(`${process.env.API_BASE_URL}/v1/product/${item.productUUID}/seller`, {
            headers
        });

        if (!sellerRes.ok) {
            throw new Error(`Failed to fetch seller for product ${item.productUUID}`);
        }

        const sellerData = await sellerRes.json();
        
        if (!isValidResponse<SellerResponse>(sellerData)) {
            throw new Error(`Invalid seller response format for product ${item.productUUID}`);
        }

        return {
            sellerUUID: sellerData.result.sellerUuid,
            productName: item.productName,
            price: parseInt(item.productPrice),
            soldAt: new Date().toISOString()
        };
    }));

    const res = await fetch(`${process.env.API_BASE_URL}/v2/settlement/ledger`, {
        method: "POST",
        headers,
        body: JSON.stringify(transformedPayload),
    })

    if (!res.ok) {
        throw new Error("Failed to append ledger")
    }

    return res.json()
}
