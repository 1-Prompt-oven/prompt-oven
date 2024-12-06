import React from "react"
import { Progress as ShadcnProgress } from "@repo/ui/progress"

interface ProgressProps {
	value: number
	className?: string
}

export function RsProgress({ value, className }: ProgressProps) {
	return (
		<ShadcnProgress
			value={value}
			className={`h-2 rounded-full bg-po-purple-200 ${className}`}
			indicatorProps={{ className: "bg-po-purple-100" }}
		/>
	)
}
