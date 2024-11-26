import * as React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement>

export const PcInput = forwardRef<HTMLInputElement, CustomInputProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				className={cn(
					"w-full rounded-md border-b border-black bg-black p-[10px_14px] text-[0.875rem] leading-[160%] tracking-[-0.02em] text-slate-400 placeholder:text-slate-400 focus:outline-none",
					className,
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
PcInput.displayName = "PcInput"
