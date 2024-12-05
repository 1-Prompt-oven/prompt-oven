import React from "react"
import { Button as ShadcnButton } from "@repo/ui/button"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "secondary"
	className?: string
}

export function RsButton({
	variant = "default",
	className,
	...props
}: ButtonProps) {
	const baseClass = "text-white"
	const variantClass =
		variant === "default" ? "bg-[#A913F9]" : "bg-[#A913F9]/50"
	return (
		<ShadcnButton
			className={`${baseClass} ${variantClass} ${className}`}
			{...props}
		/>
	)
}
