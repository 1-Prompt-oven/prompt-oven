import React, { useState } from "react"
import { Button, type ButtonProps } from "@repo/ui/button"
import { ThreeDots } from "react-loader-spinner"
import { cn, delay } from "@/lib/utils"

export interface PcButtonProps extends ButtonProps {
	children?: React.ReactNode
	isLoading?: boolean
	onClick?: () => Promise<void> | void
}

function PcButton({
	children,
	isLoading: externalLoading,
	onClick,
	...props
}: PcButtonProps) {
	const [internalLoading, setInternalLoading] = useState(false)
	const isLoading = externalLoading || internalLoading

	const handleClick = async () => {
		if (onClick) {
			setInternalLoading(true)
			try {
				await onClick()
				await delay(1000)
			} finally {
				setInternalLoading(false)
			}
		}
	}

	return (
		<Button
			type="button"
			{...props}
			onClick={handleClick}
			disabled={isLoading || props.disabled}
			className={cn(
				"flex h-10 items-center justify-center gap-2 rounded-lg bg-po-purple-100 px-4 py-2 hover:bg-po-purple-100 hover:opacity-90",
				props.className,
			)}>
			{isLoading ? (
				<ThreeDots
					visible
					width="34"
					height="34"
					radius="9"
					color="#ffffff"
					ariaLabel="three-dots-loading"
					wrapperStyle={{}}
					wrapperClass=""
				/>
			) : (
				children
			)}
		</Button>
	)
}

export default PcButton
