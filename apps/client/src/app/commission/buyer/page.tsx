import React from "react"
import BuyerListTemplate from "@/components/commission/buyer/list/template/BuyerListTemplate"
import { getCommissionsList } from "@/action/commission/commissionAction"

async function BuyerCommissionListPage() {
	const commissions = await getCommissionsList()
	return <BuyerListTemplate initialCommissions={commissions} />
}

export default BuyerCommissionListPage
