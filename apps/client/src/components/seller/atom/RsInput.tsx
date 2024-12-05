import React from "react"
import { Input as ShadcnInput } from "@repo/ui/input"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
}
export const RsInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<ShadcnInput
				className={`border-[#A913F9]/20 bg-black text-white ${className}`}
				{...props}
				ref={ref}
			/>
		)
	},
)

RsInput.displayName = "RsInput"
