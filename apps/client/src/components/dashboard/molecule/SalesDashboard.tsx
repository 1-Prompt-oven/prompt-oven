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
	view: number
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
					dates.push({ name: formattedDate, view: 0 })
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
					view: matchingResult ? matchingResult.viewer : defaultItem.view,
				}
			})

			setData(mappedData)
		}
		fetchData()
	}, [beginDate, endDate])

	const formatXAxisLabel = (value: string) => {
		const date = new Date(value)
		switch (selectedPeriod) {
			case "week": {
				return date.toLocaleDateString("en-US", { weekday: "short" }) // "Mon", "Tue", ...
			}
			case "month": {
				const weekNumber = Math.min(Math.ceil(date.getDate() / 7), 4)
				return `${weekNumber}-week` // "1-week", "2-week", ...
			}
			case "6-months":
			case "year": {
				return date.toLocaleDateString("en-US", { month: "short" }) // "Jan", "Feb", ...
			}
			case "10-years": {
				return date.getFullYear().toString() // "2023", "2024", ...
			}
			default: {
				return value
			}
		}
	}

	return (
		<div className="flex h-screen max-h-[900px] w-screen items-center justify-center bg-white">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						tickFormatter={formatXAxisLabel}
						label={{
							value: "Date",
							position: "insideBottomRight",
							offset: -5,
						}}
					/>
					<YAxis
						label={{
							value: "Sales",
							position: "insideTopLeft",
							offset: 0,
							dy: -20,
						}}
					/>
					<Tooltip />
					<Legend verticalAlign="top" height={36} />
					<Area
						type="monotone"
						dataKey="Sales"
						name="Sales Count"
						stroke="#8884d8"
						fill="rgba(136, 132, 216, 0.3)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

export default ViewDashboard
