import React, { useState } from "react"
import { Button } from "@repo/ui/button"
import { ThreeDots } from "react-loader-spinner"
import type { ButtonProps } from "@/components/seller/atom/RsButton.tsx"
import { delay } from "@/lib/utils.ts"

interface LoadingButtonProps extends ButtonProps {
	children?: React.ReactNode
	isLoading?: boolean
	onClick?: () => Promise<void> | void
	isAsync?: boolean
}

function LoadingButton({
	children,
	isLoading: externalLoading,
	isAsync = false,
	onClick,
	...props
}: LoadingButtonProps) {
	const [internalLoading, setInternalLoading] = useState(false)
	const isLoading = externalLoading || internalLoading

	const handleClick = async () => {
		if (onClick && isAsync) {
			setInternalLoading(true)
			try {
				await onClick()
				await delay(1000)
			} finally {
				setInternalLoading(false)
			}
		} else if (onClick && !isAsync) {
			onClick()
		}
	}

	return (
		<Button
			type="button"
			{...props}
			onClick={handleClick}
			disabled={isLoading || props.disabled}>
			{isLoading ? (
				<ThreeDots
					visible
					width="100"
					height="80"
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

export default LoadingButton
