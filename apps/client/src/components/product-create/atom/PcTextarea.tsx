import * as React from "react"
import { cn } from "@/lib/utils"

export type PcTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const PcTextarea = React.forwardRef<
	HTMLTextAreaElement,
	PcTextareaProps
>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				"box-border flex min-h-40 w-full resize-none flex-row items-start gap-2 rounded border-b border-black bg-black p-[10px_14px] text-[0.875rem] font-normal leading-[160%] tracking-[-0.02em] text-[#94A3B8] placeholder-[#94A3B8] focus:outline-none",
				className,
			)}
			ref={ref}
			{...props}
		/>
	)
})
PcTextarea.displayName = "PcTextarea"
