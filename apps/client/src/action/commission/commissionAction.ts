"use server"
import { actionHandler } from "@/action/actionHandler"
import type {
	CommonResType,
	CreateCommissionResponseType,
} from "@/types/common/responseType"
import type {
	CreateCommissionRequestType,
	CommissionListType,
	CommissionDetailType,
} from "@/types/commission/commissionType"
import { getAuthHeaders } from "@/lib/api/headers"
import { getMemberUUID } from "@/lib/api/sessionExtractor"

export const createCommission = async (req: CreateCommissionRequestType) => {
	"use server"
	const headers = await getAuthHeaders()

	return actionHandler<CommonResType<CreateCommissionResponseType>>({
		name: "createCommission",
		url: `${process.env.API_BASE_URL}/v1/member/commission`,
		options: {
			headers,
			method: "POST",
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	})
}

export const getCommissionsList = async (sortBy = "Latest") => {
	"use server"
	const headers = await getAuthHeaders()
	const userUuid = await getMemberUUID()

	return actionHandler<CommonResType<CommissionListType[]>>({
		name: "getCommissionsList",
		url: `${process.env.API_BASE_URL}/v1/member/commission/list/${userUuid}?sortBy=${encodeURIComponent(sortBy)}`,
		options: {
			headers,
			cache: "no-cache",
		},
	})
}

export const getCommissionDetail = async (commissionUuid: string) => {
	"use server"
	const headers = await getAuthHeaders()

	return actionHandler<CommonResType<CommissionDetailType>>({
		name: "getCommissionDetail",
		url: `${process.env.API_BASE_URL}/v1/member/commission/${commissionUuid}`,
		options: {
			headers,
			cache: "no-cache",
		},
	})
}
