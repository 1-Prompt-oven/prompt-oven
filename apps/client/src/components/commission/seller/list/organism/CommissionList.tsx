import React from "react"
import CommissionListItem from "@/components/commission/seller/list/molecule/CommissionListItem"
import type { Commission } from "@/types/commission/commissionType"

interface CommissionListProps {
	commissions: Commission[]
}

function CommissionList({ commissions }: CommissionListProps) {
	return (
		<div className="space-y-4">
			{commissions.map((commission) => (
				<CommissionListItem key={commission.id} commission={commission} />
			))}
		</div>
	)
}

export default CommissionList
