/* eslint-disable -- 임시 푸시*/

"use client"

import React, { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"
import { getLabelsAndDateRange } from "../atom/PeriodLabel"
import { fetchStatisticHistory } from "@/action/dashboard/dashboardAction"

interface PeriodUnitType {
	selectedPeriod: string
	selectedUnit: string
}

function SalesDashboard({ selectedPeriod, selectedUnit }: PeriodUnitType) {
	const chartRef = useRef<HTMLCanvasElement | null>(null)
	const chartInstanceRef = useRef<Chart | null>(null)

	useEffect(() => {
		const fetchAndUpdateChart = async () => {
			try {
				// 날짜 범위 및 라벨 생성
				const { labels, beginDate, endDate } = getLabelsAndDateRange(
					selectedPeriod,
					selectedUnit,
				)

				// API 호출
				const results = await fetchStatisticHistory(beginDate, endDate)

				// 데이터 처리: 단위(unit)에 따라 데이터를 그룹화
				const groupedData = labels.map((label, index) => {
					if (selectedUnit === "day") {
						return results.find((item) => item.targetDate === label)?.sales || 0
					} else if (selectedUnit === "week") {
						const weekStart = index * 7 // 현재 주 시작일 인덱스
						const weekEnd = weekStart + 6 // 현재 주 마지막일 인덱스
						return results
							.filter((item, idx) => idx >= weekStart && idx <= weekEnd)
							.reduce((sum, item) => sum + item.sales, 0)
					} else if (selectedUnit === "month") {
						const month = label.split("-")[1] // MM
						return results
							.filter((item) => item.targetDate.split("-")[1] === month)
							.reduce((sum, item) => sum + item.sales, 0)
					} else if (selectedUnit === "year") {
						const year = label.split("-")[0] // YYYY
						return results
							.filter((item) => item.targetDate.split("-")[0] === year)
							.reduce((sum, item) => sum + item.sales, 0)
					}
					return 0
				})

				// 차트 업데이트
				if (chartInstanceRef.current) {
					chartInstanceRef.current.data.labels = labels
					chartInstanceRef.current.data.datasets[0].data = groupedData
					chartInstanceRef.current.update()
				} else if (chartRef.current) {
					const ctx = chartRef.current.getContext("2d")
					if (!ctx) return

					chartInstanceRef.current = new Chart(ctx, {
						type: "line",
						data: {
							labels,
							datasets: [
								{
									label: "Sales Data",
									data: groupedData,
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
									text: "Sales",
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
				}
			} catch (error) {
				console.error("Error fetching data or rendering chart:", error)
			}
		}

		fetchAndUpdateChart()

		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy()
			}
		}
	}, [selectedPeriod, selectedUnit])

	return (
		<div className="flex h-full w-full items-center justify-center">
			<canvas ref={chartRef} className="h-full w-full bg-white" />
		</div>
	)
}

export default SalesDashboard
