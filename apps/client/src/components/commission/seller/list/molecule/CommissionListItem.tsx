"use client"

import React from "react"
import Link from "next/link"
import StatusBadge from "@/components/commission/seller/list/atom/StatusBadge"
import DateDisplay from "@/components/commission/seller/list/atom/DateDisplay"
import type { CommissionListType } from "@/types/commission/commissionType"

interface CommissionListItemProps {
	commission: CommissionListType
}

function CommissionListItem({ commission }: CommissionListItemProps) {
	return (
		<Link
			href={`/commission/seller/${commission.commissionUuid}`}
			className="block">
			<div className="rounded-lg bg-gray-900 p-4 transition-colors hover:bg-gray-800">
				<div className="mb-2 flex items-start justify-between">
					<h3 className="truncate text-lg font-semibold text-white">
						{commission.title}
					</h3>
					<StatusBadge status={commission.status} />
				</div>
				<div className="flex items-center justify-between text-sm">
					<span className="font-medium text-purple-400">
						${commission.price.toLocaleString()}
					</span>
					<div className="flex space-x-4">
						<DateDisplay date={commission.requestedDate} label="Requested" />
						<DateDisplay date={commission.deadline} label="Deadline" />
					</div>
				</div>
				<div className="mt-2 text-sm text-gray-400">
					Requester: {commission.clientUuid}
				</div>
			</div>
		</Link>
	)
}

export default CommissionListItem