"use client"

import React, { useEffect } from "react"
import { PeriodDropdown } from "../atom/PeriodDropdown"
import { PeriodUnitDropdown } from "../atom/PeriodUnitDropdown"

interface DashboardHeaderProps {
	selectedPeriod: string
	setSelectedPeriod: (value: string) => void
	selectedUnit: string
	setSelectedUnit: (value: string) => void
}

function DashboardHeader({
	selectedPeriod,
	setSelectedPeriod,
	selectedUnit,
	setSelectedUnit,
}: DashboardHeaderProps) {
	// periods에 따라 units 결정
	const getAvailableUnits = (period: string) => {
		switch (period) {
			case "week":
				return ["day"]
			case "month":
				return ["day", "week"]
			case "6-months":
				return ["week", "month"]
			case "year":
				return ["month"]
			case "10-years":
				return ["year"]
			default:
				return []
		}
	}

	const availableUnits = getAvailableUnits(selectedPeriod)
	const isDropdownDisabled = availableUnits.length === 0

	// selectedPeriod 변경 시 자동으로 selectedUnit 설정
	useEffect(() => {
		if (availableUnits.length === 1) {
			setSelectedUnit(availableUnits[0]) // 단일 옵션 자동 설정
		} else if (!availableUnits.includes(selectedUnit)) {
			setSelectedUnit("") // 기존 선택이 유효하지 않으면 초기화
		}
	}, [selectedPeriod, availableUnits, selectedUnit, setSelectedUnit])

	return (
		<div className="flex justify-between gap-4 px-4">
			<div className="text-center text-4xl text-white">Summary</div>
			<div className="flex flex-row">
				<PeriodDropdown
					selectedPeriod={selectedPeriod}
					onSelect={(value) => {
						setSelectedPeriod(value)
						setSelectedUnit("")
					}}
				/>
				<PeriodUnitDropdown
					selectedUnit={selectedUnit}
					onSelect={setSelectedUnit}
					availableUnits={availableUnits}
					disabled={isDropdownDisabled}
				/>
			</div>
		</div>
	)
}

export default DashboardHeader
