import * as React from "react"
import { cn } from "@/lib/utils"

interface TitleSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
	headingProps?: React.HTMLAttributes<HTMLHeadingElement>
}

export default function PcTitle({
	children,
	headingProps,
	className,
	...props
}: TitleSectionProps) {
	return (
		<div {...props} className={cn("flex w-full items-center gap-2", className)}>
			<div className="w-1 self-stretch bg-po-purple-100" />
			<h2
				{...headingProps}
				className={cn(
					"flex-1 text-[1.125rem] font-medium leading-[23px] text-po-purple-50",
					headingProps?.className,
				)}>
				{children}
			</h2>
		</div>
	)
}
