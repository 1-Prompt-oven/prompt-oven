"use client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu"
import React from "react"

export function PeriodDropdown({
	selectedPeriod,
	onSelect,
}: {
	selectedPeriod: string
	onSelect: (value: string) => void
}) {
	const periods = [
		{ label: "지난 1년", value: "year" },
		{ label: "지난 6개월", value: "6-months" },
		{ label: "지난 1개월", value: "month" },
		{ label: "지난 1주일", value: "week" },
	]

	return (
		<div className="p-2">
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
							onClick={() => onSelect(period.value)}>
							{period.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
