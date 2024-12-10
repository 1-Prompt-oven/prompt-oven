"use client"

import React, { useState } from "react"
import DashboardHeader from "../molecule/DashboardHeader"
import SalesDashboard from "../molecule/SalesDashboard"
import ViewDashboard from "../molecule/ViewDashboard"
import FollowDashboard from "../molecule/FollowDashboard"
import SalesAmountDashboard from "../molecule/SalesAmountDashboard"

function DashboardTemplete() {
	const [selectedPeriod, setSelectedPeriod] = useState<string>("")
	const [selectedUnit, setSelectedUnit] = useState<string>("")
	return (
		<div className="py-5">
			<div>
				<DashboardHeader
					selectedPeriod={selectedPeriod}
					setSelectedPeriod={setSelectedPeriod}
					selectedUnit={selectedUnit}
					setSelectedUnit={setSelectedUnit}
				/>
			</div>
			<div className="grid grid-cols-2 items-center justify-center p-6">
				<div className="flex items-center justify-center p-1">
					<SalesDashboard
						selectedPeriod={selectedPeriod}
						selectedUnit={selectedUnit}
					/>
				</div>
				<div className="flex items-center justify-center p-1">
					<SalesAmountDashboard
						selectedPeriod={selectedPeriod}
						selectedUnit={selectedUnit}
					/>
				</div>
				<div className="flex items-center justify-center p-1">
					<FollowDashboard
						selectedPeriod={selectedPeriod}
						selectedUnit={selectedUnit}
					/>
				</div>
				<div className="flex items-center justify-center p-1">
					<ViewDashboard
						selectedPeriod={selectedPeriod}
						selectedUnit={selectedUnit}
					/>
				</div>
			</div>
		</div>
	)
}

export default DashboardTemplete
