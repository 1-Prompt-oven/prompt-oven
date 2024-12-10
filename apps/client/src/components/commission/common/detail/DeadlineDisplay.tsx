import React from "react"

interface DeadlineDisplayProps {
	deadline: string
}

function DeadlineDisplay({ deadline }: DeadlineDisplayProps) {
	return (
		<div className="space-y-1">
			<h2 className="text-lg font-semibold text-white">Deadline</h2>
			<p className="text-gray-300">{new Date(deadline).toLocaleDateString()}</p>
		</div>
	)
}

export default DeadlineDisplay
