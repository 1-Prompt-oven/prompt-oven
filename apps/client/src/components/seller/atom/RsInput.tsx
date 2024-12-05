import { Input as ShadcnInput } from "@repo/ui/input"
import type { InputHTMLAttributes } from "react"
import { forwardRef } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
}
export const RsInput = forwardRef<HTMLInputElement, InputProps>(
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
