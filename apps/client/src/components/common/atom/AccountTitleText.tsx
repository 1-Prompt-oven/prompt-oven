import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils.ts"

interface AccountTitleTextProps extends HTMLAttributes<HTMLSpanElement> {
	children?: ReactNode
}

function AccountTitleText({ children, ...props }: AccountTitleTextProps) {
	return (
		<span
			{...props}
			className={cn(
				"items-center text-2xl font-medium leading-[150%] text-white",
				props.className,
			)}>
			{children}
		</span>
	)
}

export default AccountTitleText
