import type { ButtonHTMLAttributes} from "react";
import React, { forwardRef } from "react"
import { Button as ShadcnButton } from "@repo/ui/button"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "secondary"
	className?: string
}

export const RsButton = forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = "default", className, ...props }, ref) => {
		const baseClass = "text-white"
		const variantClass =
			variant === "default" ? "bg-po-purple-100" : "bg-po-purple-100/50"
		return (
			<ShadcnButton
				ref={ref}
				className={`${baseClass} ${variantClass} ${className}`}
				{...props}
			/>
		)
	},
)

RsButton.displayName = "RsButton"
