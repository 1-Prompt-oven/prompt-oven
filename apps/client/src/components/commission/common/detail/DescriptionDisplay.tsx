import React from "react"

interface DescriptionDisplayProps {
	description: string
}

function DescriptionDisplay({ description }: DescriptionDisplayProps) {
	return (
		<div className="space-y-2 text-gray-300">
			<h2 className="text-lg font-semibold text-white">Description</h2>
			<p className="text-sm leading-relaxed">{description}</p>
		</div>
	)
}

export default DescriptionDisplay
