import React from "react"

interface DeadlineDisplayProps {
	creatorName: string
}

function CreatorDisplay({ creatorName }: DeadlineDisplayProps) {
	return (
		<div className="xxxs:text-right space-y-1 sm:text-left">
			<h2 className="text-lg font-semibold text-white">Creator </h2>
			<p className="text-gray-300">{creatorName}</p>
		</div>
	)
}

export default CreatorDisplay
