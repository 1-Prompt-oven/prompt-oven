"use client"

import React, { useState, useEffect } from "react"
import dayjs from "dayjs"
import DashboardHeader from "../molecule/DashboardHeader"
import SalesDashboard from "../molecule/SalesDashboard"
import { ViewDashboard } from "../molecule/ViewDashboard"
import { FollowDashboard } from "../molecule/FollowDashboard"
import SalesAmountDashboard from "../molecule/SalesAmountDashboard"

function DashboardTemplete() {
	const [selectedPeriod, setSelectedPeriod] = useState<string>("week") // 기본값 "week"
	const [beginDate, setBeginDate] = useState<string>("")
	const [endDate, setEndDate] = useState<string>("")

	// selectedPeriod에 따라 beginDate와 endDate 계산
	useEffect(() => {
		const calculateDates = () => {
			const today = dayjs()
			let calculatedBeginDate = today

			switch (selectedPeriod) {
				case "week":
					calculatedBeginDate = today.subtract(1, "week")
					break
				case "month":
					calculatedBeginDate = today.subtract(1, "month")
					break
				case "6-months":
					calculatedBeginDate = today.subtract(6, "month")
					break
				case "year":
					calculatedBeginDate = today.subtract(1, "year")
					break
				case "10-years":
					calculatedBeginDate = today.subtract(10, "year")
					break
				default:
					calculatedBeginDate = today
			}

			setBeginDate(calculatedBeginDate.format("YYYY-MM-DD"))
			setEndDate(today.format("YYYY-MM-DD"))
		}

		if (selectedPeriod) {
			calculateDates()
		}
	}, [selectedPeriod])

	return (
		<div className="mx-auto mt-5 max-w-screen-2xl">
			<div>
				<DashboardHeader
					selectedPeriod={selectedPeriod}
					setSelectedPeriod={setSelectedPeriod}
				/>
			</div>
			<div className="grid grid-cols-1 items-center justify-center p-6 xl:grid-cols-2">
				<div className="sm:h-500px flex items-center justify-center p-1">
					<SalesDashboard
						selectedPeriod={selectedPeriod}
						beginDate={beginDate}
						endDate={endDate}
					/>
				</div>
				<div className="flex items-center justify-center p-1">
					<SalesAmountDashboard
						selectedPeriod={selectedPeriod}
						beginDate={beginDate}
						endDate={endDate}
					/>
				</div>
				<div className="flex items-center justify-center p-1">
					<FollowDashboard
						selectedPeriod={selectedPeriod}
						beginDate={beginDate}
						endDate={endDate}
					/>
				</div>
				<div className="flex items-center justify-center p-1">
					<ViewDashboard
						selectedPeriod={selectedPeriod}
						beginDate={beginDate}
						endDate={endDate}
					/>
				</div>
			</div>
		</div>
	)
}

export default DashboardTemplete
