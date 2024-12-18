/* eslint-disable no-console -- 개발 중 디버깅을 위해 console 사용을 허용 */
"use server"
import { revalidateTag } from "next/cache"
import type {
	CommonResType,
	CreateCommissionResponseType,
} from "@/types/common/responseType"
import type {
	CreateCommissionRequestType,
	CommissionListType,
	CommissionListResponseType,
	CommissionDetailType,
	RevisionRequestType,
	CommissionStatusUpdateRequestType,
} from "@/types/commission/commissionType"
import { getAuthHeaders } from "@/lib/api/headers"
import { getMemberUUID } from "@/lib/api/sessionExtractor"
import { getProfileMemberInfoByUuid } from "@/action/profile/getProfileData"

export const createCommission = async (req: CreateCommissionRequestType) => {
	"use server"
	const headers = await getAuthHeaders()

	const response = await fetch(
		`${process.env.API_BASE_URL}/v1/member/commission`,
		{
			method: "POST",
			headers,
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	)
	if (!response.ok) {
		throw new Error("커미션 ")
	}

	const data: CommonResType<CreateCommissionResponseType> =
		await response.json()
	const commissionUuid = data.result.commissionUuid
	// 상품 상세 데이터 요청
	return commissionUuid
}

export const getCommissionsList = async (
	sortBy = "Latest",
): Promise<CommissionListType[]> => {
	"use server"
	const headers = await getAuthHeaders()
	const userUuid = await getMemberUUID()

	try {
		const response = await fetch(
			`${process.env.API_BASE_URL}/v1/member/commission/list/${userUuid}?userUuid=${userUuid}&sortBy=${encodeURIComponent(sortBy)}`,
			{
				method: "GET",
				headers,
				cache: "no-cache",
				next: { tags: ["updateCommissionList"] },
			},
		)

		const data: CommonResType<CommissionListResponseType[]> =
			await response.json()
		const commissionList = data.result
		if (commissionList.length === 0) {
			return []
		}
		const clientName = await Promise.all(
			commissionList.map(async (commission) => {
				const clientInfo = await getProfileMemberInfoByUuid(
					commission.clientUuid,
				)
				return clientInfo.nickname
			}),
		)
		const creatorName = await Promise.all(
			commissionList.map(async (commission) => {
				const { creatorUuid } = await getCommissionDetail(
					commission.commissionUuid,
				)
				const creatorInfo = await getProfileMemberInfoByUuid(creatorUuid)
				return creatorInfo.nickname
			}),
		)
		const commissions = commissionList.map((commission, index) => {
			return {
				...commission,
				clientName: clientName[index],
				creatorName: creatorName[index],
			}
		})
		return commissions
	} catch (error) {
		console.error("커미션 목록 조회 실패", error)
		return []
	}
}

export const getCommissionDetail = async (
	commissionUuid: string,
): Promise<CommissionDetailType> => {
	"use server"
	const headers = await getAuthHeaders()
	const userUuid = await getMemberUUID()

	const response = await fetch(
		`${process.env.API_BASE_URL}/v1/member/commission/details/${commissionUuid}?commissionUuid=${commissionUuid}&userUuid=${userUuid}`,
		{
			method: "GET",
			headers,
			cache: "no-cache",
			next: { tags: ["updateDetails"] },
		},
	)
	if (!response.ok) {
		throw new Error("Failed to fetch purchased list data")
	}

	const data: CommonResType<CommissionDetailType> = await response.json()
	const commissionDetail = data.result
	const clientName = await getProfileMemberInfoByUuid(
		commissionDetail.clientUuid,
	)
	commissionDetail.clientName = clientName.nickname
	return commissionDetail
}

export const requestModification = async (req: RevisionRequestType) => {
	"use server"
	const headers = await getAuthHeaders()
	const response = await fetch(
		`${process.env.API_BASE_URL}/v1/member/commission/requestModify`,
		{
			method: "PUT",
			headers,
			body: JSON.stringify(req),
			cache: "no-cache",
		},
	)
	if (!response.ok) {
		throw new Error("Failed to fetch purchased list data")
	}
	const data: CommonResType<Record<string, never>> = await response.json()
	statusUpdate({
		commissionUuid: req.commissionUuid,
		status: "REVISION_REQUESTED",
	})
	revalidateTag("updateDetails")
	return data
}

export const statusUpdate = async (req: CommissionStatusUpdateRequestType) => {
	"use server"
	const headers = await getAuthHeaders()
	const { commissionUuid, status } = req

	const response = await fetch(
		`${process.env.API_BASE_URL}/v1/member/commission/statusUpdate/${req.commissionUuid}?commissionUuid=${commissionUuid}&status=${status}`,
		{
			method: "PUT",
			headers,
			cache: "no-cache",
		},
	)
	if (!response.ok) {
		throw new Error("커미션 상태 업데이트 실패")
	}
	const data: CommonResType<Record<string, never>> = await response.json()
	revalidateTag("updateDetails")
	return data
}

export const uploadResult = async (req: {
	commissionUuid: string
	result: string
}) => {
	"use server"
	const headers = await getAuthHeaders()
	const { commissionUuid, result } = req

	const response = await fetch(
		`${process.env.API_BASE_URL}/v1/member/commission/uploadResult`,
		{
			method: "POST",
			headers,
			body: JSON.stringify({ commissionUuid, commissionResult: result }),
			cache: "no-cache",
		},
	)
	if (!response.ok) {
		throw new Error("결과물 업로드 실패")
	}
	const data: CommonResType<null> = await response.json()
	statusUpdate({ commissionUuid, status: "COMPLETED" })
	revalidateTag("updateDetails")
	return data
}

export const uploadRevision = async (req: {
	commissionUuid: string
	result: string
}) => {
	"use server"
	const headers = await getAuthHeaders()
	const { commissionUuid, result } = req

	const response = await fetch(
		`${process.env.API_BASE_URL}/v1/member/commission/uploadResult`,
		{
			method: "POST",
			headers,
			body: JSON.stringify({ commissionUuid, commissionResult: result }),
			cache: "no-cache",
		},
	)
	if (!response.ok) {
		throw new Error("결과물 업로드 실패")
	}
	const data: CommonResType<null> = await response.json()
	statusUpdate({ commissionUuid, status: "REVISION_COMPLETED" })
	revalidateTag("updateDetails")
	return data
}
