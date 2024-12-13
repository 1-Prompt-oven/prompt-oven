import React from "react"
import type { CommissionStatus } from "@/types/commission/commissionType"

interface StatusDisplayProps {
	status: CommissionStatus
}

function StatusIndicator({ status }: StatusDisplayProps) {
	const getStatusColor = (commissionStatus: CommissionStatus) => {
		switch (commissionStatus) {
			case "COMPLETED":
				return "bg-green-500/10 text-green-500 border-green-500/20"
			case "IN_PROGRESS":
				return "bg-blue-500/10 text-blue-500 border-blue-500/20"
			case "REVISION_REQUESTED":
				return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
			case "REJECTED":
				return "bg-red-500/10 text-red-500 border-red-500/20"
			default:
				return "bg-purple-500/10 text-purple-500 border-purple-500/20"
		}
	}
	return (
		<div className="space-y-1">
			<h2 className="text-lg font-semibold text-white">Status</h2>
			<span
				className={`rounded-full border px-3 py-1 ${getStatusColor(status)} capitalize`}>
				{status.replace("_", " ")}
			</span>
		</div>
	)
}

export default StatusIndicator
