import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Button } from "@repo/ui/button"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	className?: string
}

export default function GradientButton({
	children,
	className,
	...props
}: GradientButtonProps) {
	return (
		<Button
			className={cn(
				"h-[50px] w-[159px] px-[35px] py-[15px]",
				"text-center text-white",
				"font-sora text-[15px] font-semibold leading-[20px]",
				"rounded-[10px]",
				"transition-all duration-300 ease-in-out",
				"hover:opacity-90",
				"focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50",
				"disabled:opacity-50",
				"bg-gradient-to-r from-[#A913F9] to-[#9D3D81]", // gradient 값
				className,
			)}
			{...props}>
			{children}
		</Button>
	)
}

