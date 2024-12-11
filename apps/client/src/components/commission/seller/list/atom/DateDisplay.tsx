import React from "react"

interface DateDisplayProps {
	date: string
	label: string
}

function DateDisplay({ date, label }: DateDisplayProps) {
	return (
		<div className="flex flex-col">
			<span className="text-xs text-gray-400">{label}</span>
			<span className="text-sm text-gray-200">
				{new Date(date).toLocaleDateString()}
			</span>
		</div>
	)
}

export default DateDisplay
