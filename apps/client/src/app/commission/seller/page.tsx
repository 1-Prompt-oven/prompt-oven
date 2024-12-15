import React from "react"
import SellerListTemplate from "@/components/commission/seller/list/template/SellerListTemplate"
import { getCommissionsList } from "@/action/commission/commissionAction"

async function SellerCommissionListPage() {
	const commissions = await getCommissionsList()
	return <SellerListTemplate initialCommissions={commissions} />
}

export default SellerCommissionListPage
