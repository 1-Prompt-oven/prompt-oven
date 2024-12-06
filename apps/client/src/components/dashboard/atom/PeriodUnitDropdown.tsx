"use client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu"
import React from "react"

export function PeriodUnitDropdown({
	selectedUnit,
	onSelect,
	availableUnits,
	disabled,
}: {
	selectedUnit: string
	onSelect: (value: string) => void
	availableUnits: string[] // 동적으로 표시할 단위 배열
	disabled: boolean
}) {
	const units = [
		{ label: "일", value: "day" },
		{ label: "주", value: "week" },
		{ label: "월", value: "month" },
		{ label: "년", value: "year" },
	]

	return (
		<div className="p-2">
			<DropdownMenu>
				<DropdownMenuTrigger
					style={{ width: "150px", textAlign: "center" }}
					className={`rounded-md border-[#A100F8] bg-[#A913F9] px-4 py-2 text-sm font-medium text-white ${
						disabled ? "cursor-not-allowed opacity-50" : ""
					}`}
					disabled={disabled}>
					{disabled ? "Unselectable" : selectedUnit || "Period Unit"}
				</DropdownMenuTrigger>
				<DropdownMenuContent className="border-[#A100F8] bg-[#a600ff] px-4 py-2 text-sm font-medium text-white hover:bg-[#8913c9]">
					{units
						.filter((unit) => availableUnits.includes(unit.value))
						.map((unit) => (
							<DropdownMenuItem
								key={unit.value}
								onClick={() => onSelect(unit.value)}>
								{unit.label}
							</DropdownMenuItem>
						))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
