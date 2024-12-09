import type { AnchorHTMLAttributes, ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils.ts"

interface SpLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	className?: string
	href: string
	children: ReactNode
}

function SpLink({ href, className, children, ...props }: SpLinkProps) {
	return (
		<Link
			href={href}
			className={cn(
				"h-[50px] min-w-20 rounded-[10px] bg-po-purple-100 px-[35px] py-[15px] text-center font-sora text-[15px] font-semibold leading-[20px] text-white transition-all duration-300 ease-in-out hover:opacity-90 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 disabled:opacity-50",
				className,
			)}
			{...props}>
			{children}
		</Link>
	)
}

export default SpLink
