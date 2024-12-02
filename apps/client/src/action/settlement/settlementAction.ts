import type {
	GetSellerRequestType,
	GetSellerResponseType,
	RegisterSellerRequestType
} from "@/types/settlement/settlementType.ts";
import {actionHandler} from "@/action/actionHandler.ts";
import type {CommonResType} from "@/types/common/responseType.ts";


export const registerSeller = async (req: RegisterSellerRequestType) => {
	return actionHandler<CommonResType<object>>({
		name: "registerSeller",
		url: "/v1/member/settlement/profile",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}

export const getSellerProfile = async (req: GetSellerRequestType) => {
	return actionHandler<CommonResType<GetSellerResponseType[]>>({
		name: "getSettlementProfile",
		url: `/v1/seller/settlement/profile/list/${req.memberUUID}`,
		options: {
			method: "GET",
			cache: "no-cache",
		},
	})
}