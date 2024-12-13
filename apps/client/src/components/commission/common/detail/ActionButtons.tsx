import React from "react"
import { Button } from "@repo/ui/button"
import type { CommissionStatus } from "@/types/commission/commissionType"

interface ActionButtonsProps {
	status: CommissionStatus
	onAccept: () => void
	onRequestRevision: () => void
}

function ActionButtons({
	status,
	onAccept,
	onRequestRevision,
}: ActionButtonsProps) {
	if (status !== "COMPLETED") return null

	return (
		<div className="flex gap-4">
			<Button onClick={onAccept} className="bg-purple-600 hover:bg-purple-700">
				Accept Result
			</Button>
			<Button
				onClick={onRequestRevision}
				variant="outline"
				className="border-purple-600 text-purple-600 hover:bg-purple-600/10">
				Request Revision
			</Button>
		</div>
	)
}

export default ActionButtons
