import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils.ts"

interface PcDescriptionProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

function PcDescription({ children, ...props }: PcDescriptionProps) {
	return (
		<div
			{...props}
			className={cn(
				"w-full space-y-1 pl-3 text-sm font-medium !leading-6 text-po-black-50",
				props.className,
			)}>
			{children}
		</div>
	)
}

export default PcDescription
