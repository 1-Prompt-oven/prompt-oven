"use client"

import React, { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"
import type { PeriodUnitType } from "@/types/dashboard/PeriodUnitType"
import { getLabels } from "../atom/PeriodLabel"

function FollowDashboard({ selectedPeriod, selectedUnit }: PeriodUnitType) {
	const chartRef = useRef<HTMLCanvasElement | null>(null)
	const chartInstanceRef = useRef<Chart | null>(null)

	useEffect(() => {
		if (!chartRef.current) {
			return
		}

		const ctx = chartRef.current.getContext("2d")
		if (!ctx) {
			return
		}

		if (chartInstanceRef.current) {
			chartInstanceRef.current.destroy()
		}

		chartInstanceRef.current = new Chart(ctx, {
			type: "line",
			data: {
				labels: getLabels(selectedPeriod as string, selectedUnit as string), // X축 라벨 동적으로 설정
				datasets: [
					{
						label: "Sales Data",
						data: getData(selectedPeriod as string, selectedUnit as string), // 데이터 동적으로 설정
						fill: false,
						borderColor: "rgba(75, 192, 192, 1)",
						tension: 0.1,
					},
				],
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: "FOLLOW",
						padding: {
							top: 10,
							bottom: 30,
						},
					},
					legend: {
						display: true,
					},
					tooltip: {
						enabled: true,
					},
				},
				scales: {
					x: {
						title: {
							display: true,
							text: "Time",
						},
					},
					y: {
						title: {
							display: true,
							text: "Values",
						},
						beginAtZero: true,
					},
				},
			},
		})

		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy()
			}
		}
	}, [selectedPeriod, selectedUnit])

	const getData = (period: string, unit: string) => {
		if (unit === "day") {
			return [10, 20, 30, 40, 50, 60, 70]
		} else if (unit === "month") {
			return [200, 400, 600, 800]
		}
		return [1000, 1200, 1400, 1600, 1800, 2000, 2200]
	}

	return (
		<div className="flex h-full w-full items-center justify-center">
			<canvas ref={chartRef} className="h-full w-full bg-white" />
		</div>
	)
}

export default FollowDashboard
