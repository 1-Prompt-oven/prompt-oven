import React from "react"
import { cn } from "@/lib/utils.ts"

interface PcBaseWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
}

function PcBaseWrapper({ children, ...props }: PcBaseWrapperProps) {
	return (
		<div {...props} className={cn("space-y-4", props.className)}>
			{children}
		</div>
	)
}

export default PcBaseWrapper
