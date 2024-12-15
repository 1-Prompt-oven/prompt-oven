import React from "react"
import { CommissionDetailTemplate } from "@/components/commission/buyer/detail/template/CommissionDetailTemplate"
import { getCommissionDetail } from "@/action/commission/commissionAction"

interface CommissionDetailPageProps {
	params: { commissionId: string }
}

async function page({ params }: CommissionDetailPageProps) {
	const commissionId = params.commissionId
	const commissionData = await getCommissionDetail(commissionId)
	return <CommissionDetailTemplate commission={commissionData} />
}

export default page
