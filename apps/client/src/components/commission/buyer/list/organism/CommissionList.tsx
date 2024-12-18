import React from "react"
import CommissionListItem from "@/components/commission/buyer/list/molecule/CommissionListItem"
import type { CommissionListType } from "@/types/commission/commissionType"

interface CommissionListProps {
	commissions: CommissionListType[]
}

function CommissionList({ commissions }: CommissionListProps) {
	return (
		<div className="space-y-4">
			{commissions.map((commission) => (
				<CommissionListItem
					key={commission.commissionUuid}
					commission={commission}
				/>
			))}
		</div>
	)
}

export default CommissionList
