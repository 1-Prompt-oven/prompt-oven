"use client"

import React, { useState } from "react"
import { Input } from "@repo/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/select"
import type { Commission } from "@/types/commission/commissionType"
import CommissionList from "../organism/CommissionList"

interface SellerCommissionListTemplateProps {
	commissions: Commission[]
}

function SellerListTemplate({
	commissions,
}: SellerCommissionListTemplateProps) {
	const [searchTerm, setSearchTerm] = useState("")
	const [sortBy, setSortBy] = useState("createdAt")

	const filteredAndSortedCommissions = commissions
		.filter((commission) =>
			commission.title.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		.sort((a, b) => {
			if (sortBy === "createdAt") {
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			} else if (sortBy === "deadline") {
				return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
			} else if (sortBy === "price") {
				return b.price - a.price
			}
			return 0
		})

	return (
		<div className="min-h-screen bg-black p-4 md:p-8">
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-8 text-3xl font-bold text-white">
					Received Commissions
				</h1>
				<div className="mb-6 flex items-center justify-between">
					<Input
						type="text"
						placeholder="Search commissions..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-64 border-gray-700 bg-gray-900 text-white"
					/>
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className="w-48 border-gray-700 bg-gray-900 text-white">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="createdAt">Latest</SelectItem>
							<SelectItem value="deadline">Deadline</SelectItem>
							<SelectItem value="price">Price</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<CommissionList commissions={filteredAndSortedCommissions} />
			</div>
		</div>
	)
}

export default SellerListTemplate
