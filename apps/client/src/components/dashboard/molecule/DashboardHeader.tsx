"use client"

import React from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu"
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
		<div className="flex items-center justify-between gap-4 px-4">
			{/* 왼쪽: Summary와 ChartSvg */}
			<div className="flex items-center gap-4">
				<div className="text-center text-4xl font-bold text-white">
					Dashboard
				</div>
				<ChartSvg />
			</div>
			{/* 오른쪽: DropdownMenu */}
			<div className="flex flex-row">
				<DropdownMenu>
					<DropdownMenuTrigger
						className="rounded-md border-[#A100F8] bg-[#A913F9] px-4 py-2 text-sm font-medium text-white"
						style={{ width: "150px", textAlign: "center" }}>
						{selectedPeriod || "Period"}
					</DropdownMenuTrigger>
					<DropdownMenuContent className="border-[#A100F8] bg-[#a600ff] px-4 py-2 text-sm font-medium text-white hover:bg-[#8913c9]">
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
