/* eslint-disable -- 임시 푸시*/

"use client"

import React, { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import { getLabelsAndDateRange } from "../atom/PeriodLabel"
import { fetchStatisticHistory } from "@/action/dashboard/dashboardAction"

interface PeriodUnitType {
	selectedPeriod: string
	selectedUnit: string
}

function FollowDashboard({ selectedPeriod, selectedUnit }: PeriodUnitType) {
	const chartRef = useRef<HTMLCanvasElement | null>(null)
	const chartInstanceRef = useRef<Chart | null>(null)

	useEffect(() => {
		const fetchAndUpdateChart = async () => {
			try {
				// 날짜 범위 및 라벨 생성
				const {
					labels: newLabels,
					beginDate,
					endDate,
				} = getLabelsAndDateRange(selectedPeriod, selectedUnit)

				// API 호출
				const results = await fetchStatisticHistory(beginDate, endDate)

				// 데이터를 그래프에 사용 가능한 형식으로 변환
				const newData = results.map((item) => item.sales)
				// 차트 업데이트
				if (chartInstanceRef.current) {
					chartInstanceRef.current.data.labels = newLabels
					chartInstanceRef.current.data.datasets[0].data = newData
					chartInstanceRef.current.update()
				} else if (chartRef.current) {
					const ctx = chartRef.current.getContext("2d")
					if (!ctx) return

					chartInstanceRef.current = new Chart(ctx, {
						type: "line",
						data: {
							labels: newLabels, // X축 라벨
							datasets: [
								{
									label: "Follow Data",
									data: newData, // Y축 데이터
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
									text: "Follow",
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
	}, [selectedPeriod, selectedUnit])

	// 언마운트 시 차트 제거
	useEffect(() => {
		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy()
			}
		}
	}, [])

	return (
		<div className="flex h-full w-full items-center justify-center">
			<canvas ref={chartRef} className="h-full w-full bg-white" />
		</div>
	)
}

export default FollowDashboard
