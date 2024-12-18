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
			href={`/commission/buyer/${commission.commissionUuid}`}
			className="block">
			<div className="rounded-lg bg-gray-900 p-4 transition-colors hover:bg-gray-800">
				<div className="mb-2 flex hidden items-start justify-between sm:block">
					<h3 className="truncate text-lg font-semibold text-white">
						{commission.title}
					</h3>
					<StatusBadge status={commission.status} />
				</div>
				<h3 className="mb-2 block truncate text-lg font-semibold text-white sm:hidden">
					{commission.title}
				</h3>
				<div className="flex items-center justify-between sm:hidden">
					<span className="text-sm font-medium text-purple-400">
						{commission.price.toLocaleString()} 원
					</span>
					<StatusBadge status={commission.status} />
				</div>

				<div className="flex justify-between text-sm sm:flex-row sm:items-center">
					<div className="xxxs:text-xs xxxs:flex-col xxxs:items-start mt-3.5 flex gap-1 text-gray-400 sm:text-sm">
						Creator{" "}
						<span className="text-sm text-gray-300">
							{commission.creatorName}
						</span>
					</div>
					<div className="xxxs:mt-3.5 flex space-x-4">
						<DateDisplay date={commission.requestedDate} label="Requested" />
						<DateDisplay date={commission.deadline} label="Deadline" />
					</div>
				</div>
			</div>
		</Link>
	)
}

export default CommissionListItem
