"use client"

import React from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu"
import { Button } from "@repo/ui/button"
import { ChevronDown } from "@repo/ui/lucide"
import ChartSvg from "@/components/main/atom/icon/ChartSvg"

interface DashboardHeaderProps {
	selectedPeriod: string
	setSelectedPeriod: (value: string) => void
}

function DashboardHeader({
	selectedPeriod,
	setSelectedPeriod,
}: DashboardHeaderProps) {
	const periods = [
		{ label: "지난 1년", value: "year" },
		{ label: "지난 6개월", value: "6-months" },
		{ label: "지난 1개월", value: "month" },
		{ label: "지난 1주일", value: "week" },
	]

	return (
		<div className="flex items-center justify-between gap-4 bg-[#1B1818] px-4">
			{/* 왼쪽: Summary와 ChartSvg */}
			<div className="flex items-center gap-4">
				<div className="text-center text-2xl font-bold text-white">
					Dashboard
				</div>
				<ChartSvg />
			</div>
			{/* 오른쪽: DropdownMenu */}
			<div className="flex flex-row">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="flex h-11 items-center px-4 capitalize text-po-purple-50"
							style={{ width: "150px", textAlign: "center" }}>
							{selectedPeriod || "Period"}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56 border-po-purple-50/25 bg-[#120F1E] px-4 py-2 text-sm font-medium text-white">
						{periods.map((period) => (
							<DropdownMenuItem
								key={period.value}
								onClick={() => setSelectedPeriod(period.value)}>
								{period.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}

export default DashboardHeader
