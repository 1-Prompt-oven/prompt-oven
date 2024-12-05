import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { cn } from "../lib/utils"

const InputVariant = cva(
	"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "",
				login: "h-[50px] bg-[#333333] border-none text-white/70 px-4",
				signup: "h-[50px] bg-[#333333] border-none text-white/70 px-4",
				nickname: "h-[50px] bg-[#333333] border-none text-white/70 px-4",
			},
		},
	},
)

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof InputVariant> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, variant, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(InputVariant({ variant }), className)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Input.displayName = "Input"

export { Input }

