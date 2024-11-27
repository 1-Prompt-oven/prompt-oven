"use client"

import * as React from "react"
import type { LucideProps } from "lucide-react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
	onClose?: () => void
	children: React.ReactNode
	variant?: "default" | "outline"
	size?: "sm" | "md" | "lg"
	closeProps?: LucideProps
}

const tagVariants = cva(
	"inline-flex items-center justify-between rounded-2xl border bg-transparent text-white",
	{
		variants: {
			variant: {
				default: "border-[#E2ADFF]",
				outline: "border-white",
			},
			size: {
				sm: "text-sm px-3.5 py-2",
				md: "text-base px-3.5 py-2",
				lg: "text-lg px-3.5 py-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "sm",
		},
	},
)

export const Tag = React.forwardRef<
	HTMLDivElement,
	TagProps & VariantProps<typeof tagVariants>
>(
	(
		{ className, closeProps, onClose, children, variant, size, ...props },
		ref,
	) => {
		return (
			<div
				ref={ref}
				className={cn(tagVariants({ variant, size }), className)}
				{...props}>
				<span className="leading-none tracking-[0.1px]">{children}</span>
				{onClose ? (
					<button
						type="button"
						onClick={onClose}
						className="ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
						<X
							{...closeProps}
							className={cn("h-4 w-4 text-[#92929D]", closeProps?.className)}
						/>
						<span className="sr-only">Close</span>
					</button>
				) : null}
			</div>
		)
	},
)
Tag.displayName = "Tag"
