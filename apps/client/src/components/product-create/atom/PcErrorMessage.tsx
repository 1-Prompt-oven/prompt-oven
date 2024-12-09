import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils.ts"

interface PcErrorMessageProps extends HTMLAttributes<HTMLSpanElement> {
	errorMessage: string
}

function PcErrorMessage({ errorMessage, ...props }: PcErrorMessageProps) {
	return (
		<span
			{...props}
			className={cn(
				"text-sm font-normal leading-[160%] tracking-[0.04em] text-[#FF0000]",
				props.className,
			)}>
			{errorMessage}
		</span>
	)
}

export default PcErrorMessage
