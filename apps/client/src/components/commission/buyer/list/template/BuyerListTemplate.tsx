"use client"

/* eslint-disable no-console -- 개발 중 디버깅을 위해 console 사용을 허용 */

import React, { useState } from "react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/select"
import type { CommissionListType } from "@/types/commission/commissionType"
import { getCommissionsList } from "@/action/commission/commissionAction"
import CommissionList from "../organism/CommissionList"

interface BuyerCommissionListTemplateProps {
	initialCommissions: CommissionListType[]
}

function BuyerListTemplate({
	initialCommissions = [],
}: BuyerCommissionListTemplateProps) {
	const [sortBy, setSortBy] = useState("Latest")
	const [commissions, setCommissions] =
		useState<CommissionListType[]>(initialCommissions)

	// 정렬 기준 변경 및 API 호출
	const handleSortChange = async (value: string) => {
		setSortBy(value)
		try {
			const response = await getCommissionsList(value)
			setCommissions(response)
		} catch (error) {
			console.error("Error fetching commissions:", error)
		}
	}

	return (
		<div className="min-h-screen bg-black p-4 md:p-8">
			<div className="mx-auto max-w-4xl">
				<div className="xxxs:flex-col xxxs:gap-5 mb-6 mt-10 flex items-center justify-between sm:flex-row sm:gap-0">
					<h1 className="xxxs:text-2xl font-bold text-white sm:text-3xl">
						My Commissions
					</h1>
					<Select
						value={sortBy}
						onValueChange={(value) => handleSortChange(value)}>
						<SelectTrigger className="w-48 border-gray-700 bg-gray-900 text-white">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Latest">Latest</SelectItem>
							<SelectItem value="Deadline">Deadline</SelectItem>
							<SelectItem value="Price">Price</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<CommissionList commissions={commissions} />
			</div>
		</div>
	)
}

export default BuyerListTemplate
