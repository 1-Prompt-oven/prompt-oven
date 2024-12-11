"use client"

import React, { useEffect, useState } from "react"
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts"
import { fetchStatisticHistory } from "@/action/dashboard/dashboardAction"

interface ChartData {
	name: string
	salesAmount: number
}

export function ViewDashboard({
	selectedPeriod,
	beginDate,
	endDate,
}: {
	selectedPeriod: string
	beginDate: string
	endDate: string
}) {
	const [data, setData] = useState<ChartData[]>([])

	useEffect(() => {
		const fetchData = async () => {
			if (!beginDate || !endDate) return
			const results = await fetchStatisticHistory(beginDate, endDate)

			const generateDefaultData = (startDate: string, finishDate: string) => {
				const start = new Date(startDate)
				const end = new Date(finishDate)
				const dates = []
				while (start <= end) {
					const formattedDate = start.toISOString().split("T")[0]
					dates.push({ name: formattedDate, salesAmount: 0 })
					start.setDate(start.getDate() + 1)
				}
				return dates
			}

			const defaultData = generateDefaultData(beginDate, endDate)

			const mappedData = defaultData.map((defaultItem) => {
				const matchingResult = results.find(
					(item) => item.targetDate === defaultItem.name,
				)
				return {
					name: defaultItem.name,
					salesAmount: matchingResult
						? matchingResult.sales
						: defaultItem.salesAmount,
				}
			})

			setData(mappedData)
		}
		fetchData()
	}, [beginDate, endDate])

	const formatXAxisLabel = (value: string, index: number) => {
		const date = new Date(value)
		switch (selectedPeriod) {
			case "week":
				return date.toLocaleDateString("en-US", { weekday: "short" }) // "Mon", "Tue", ...
			case "month":
				if (index % Math.ceil(data.length / 4) === 0) {
					const weekNumber = Math.min(Math.ceil(date.getDate() / 7), 4)
					return `${weekNumber}-week` // "1-week", "2-week", ...
				}
				return ""
			case "6-months":
				if (index % Math.ceil(data.length / 6) === 0) {
					return date.toLocaleDateString("en-US", { month: "short" }) // "Jan", "Feb", ...
				}
				return ""
			case "year":
				if (index % Math.ceil(data.length / 12) === 0) {
					return date.toLocaleDateString("en-US", { month: "short" }) // "Jan", "Feb", ...
				}
				return ""
			default:
				return value
		}
	}

	const formatYAxisLabel = (value: number) => {
		if (value >= 1000000) {
			return `${(value / 1000000).toFixed(1)}M`
		} else if (value >= 1000) {
			return `${Math.round(value / 1000)}K`
		}
		return value.toString()
	}

	return (
		<div className="flex h-screen max-h-[900px] w-screen items-center justify-center bg-white">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						tickFormatter={formatXAxisLabel} // Apply custom label formatting
						label={{
							value: "Date",
							position: "insideBottomRight",
							offset: -5,
						}}
						minTickGap={1}
					/>
					<YAxis
						tickFormatter={formatYAxisLabel}
						label={{
							value: "salesAmount",
							position: "insideTopLeft",
							offset: 0,
							dy: -20,
						}}
					/>
					<Tooltip />
					<Legend verticalAlign="top" height={36} />
					<Area
						type="monotone"
						dataKey="salesAmount"
						name="salesAmount Count"
						stroke="#8884d8"
						fill="rgba(136, 132, 216, 0.3)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

export default ViewDashboard
