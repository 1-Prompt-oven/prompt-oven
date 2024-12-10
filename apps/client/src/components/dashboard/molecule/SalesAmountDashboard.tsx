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

				console.log("Generated labels:", labels)
				console.log("Date range - Begin:", beginDate, "End:", endDate)

				// API 호출
				const results = await fetchStatisticHistory(beginDate, endDate)
				console.log("Fetched results:", results)

				// 데이터 매핑: 라벨과 API 데이터를 기준으로 그룹화
				const groupedData = labels.map((label) => {
					switch (selectedUnit) {
						case "day":
							return (
								results.find((item) => item.targetDate === label)?.sales || 0
							)

						case "week":
							return results
								.filter((item) => item.targetDate.includes(label.split(" ")[1]))
								.reduce((sum, item) => sum + item.sales, 0)

						case "month":
							return results
								.filter((item) => item.targetDate.startsWith(label))
								.reduce((sum, item) => sum + item.sales, 0)

						case "year":
							return results
								.filter((item) => item.targetDate.startsWith(label))
								.reduce((sum, item) => sum + item.sales, 0)

						default:
							return 0
					}
				})

				console.log("Grouped data:", groupedData)
				console.log("Labels:", labels)

				// 차트 업데이트
				if (chartInstanceRef.current) {
					chartInstanceRef.current.data.labels = labels
					chartInstanceRef.current.data.datasets[0].data = groupedData
					chartInstanceRef.current.update()
					console.log("Chart updated with labels and data.")
				} else if (chartRef.current) {
					const ctx = chartRef.current.getContext("2d")
					if (!ctx) return

					// 새로운 차트 생성
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
