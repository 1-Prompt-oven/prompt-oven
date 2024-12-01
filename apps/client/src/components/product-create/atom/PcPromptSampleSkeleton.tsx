import type { HTMLAttributes, ReactNode } from "react"
import React from "react"
import { cn } from "@/lib/utils.ts"

interface PcPromptSampleSkeletonProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

function PcPromptSampleSkeleton({
	children,
	...props
}: PcPromptSampleSkeletonProps) {
	return (
		<div
			{...props}
			className={cn(
				"relative flex h-36 items-center justify-center gap-2 rounded-lg border-2 border-po-gray-250 bg-transparent px-4 pb-4 pt-8",
				props.className,
			)}>
			{children}
		</div>
	)
}

export default PcPromptSampleSkeleton
