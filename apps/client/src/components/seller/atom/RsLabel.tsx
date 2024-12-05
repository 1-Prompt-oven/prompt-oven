import React from "react"
import { Label as ShadcnLabel } from "@repo/ui/label"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	className?: string
}

export function RsLabel({ className, ...props }: LabelProps) {
	return <ShadcnLabel className={`text-[#E2ADFF] ${className}`} {...props} />
}
