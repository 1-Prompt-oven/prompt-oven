import React from "react"

interface DateDisplayProps {
	date: string
	label: string
}

function DateDisplay({ date, label }: DateDisplayProps) {
	return (
		<div className="flex flex-col gap-1">
			<span className="text-xs text-gray-400 sm:text-sm">{label}</span>
			<span className="xxxs:text-xs text-gray-200 sm:text-sm">
				{new Date(date).toLocaleDateString()}
			</span>
		</div>
	)
}

export default DateDisplay
