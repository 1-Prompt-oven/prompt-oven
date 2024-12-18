import React from "react"

interface DeadlineDisplayProps {
	requesterName: string
}

function RequesterDisplay({ requesterName }: DeadlineDisplayProps) {
	return (
		<div className="xxxs:text-right space-y-1 sm:text-left">
			<h2 className="text-lg font-semibold text-white">Requester </h2>
			<p className="text-gray-300">{requesterName}</p>
		</div>
	)
}

export default RequesterDisplay
