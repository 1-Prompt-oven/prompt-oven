import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils.ts"

interface PcBoundaryProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

function PcBoundary({ children, ...props }: PcBoundaryProps) {
	return (
		<div
			{...props}
			className={cn(
				"space-y-4 rounded-xl border-2 border-po-gray-250 bg-transparent p-4",
				props.className,
			)}>
			{children}
		</div>
	)
}

export default PcBoundary
