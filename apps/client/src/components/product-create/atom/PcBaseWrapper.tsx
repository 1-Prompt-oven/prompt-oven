import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils.ts"

interface PcBaseWrapperProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

function PcBaseWrapper({ children, ...props }: PcBaseWrapperProps) {
	return (
		<div {...props} className={cn("space-y-4", props.className)}>
			{children}
		</div>
	)
}

export default PcBaseWrapper
