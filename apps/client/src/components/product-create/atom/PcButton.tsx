import React from "react"
import { Button, type ButtonProps } from "@repo/ui/button"
import { cn } from "@/lib/utils.ts"

export interface PcButtonProps extends ButtonProps {
	children?: React.ReactNode
}

function PcButton({ children, ...props }: PcButtonProps) {
	return (
		<Button
			type="button"
			{...props}
			className={cn(
				"flex h-10 items-center justify-center gap-2 rounded-lg bg-po-purple-100 px-4 py-2 hover:bg-po-purple-100 hover:opacity-90",
				props.className,
			)}>
			{children}
		</Button>
	)
}

export default PcButton
