import React, { useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { delay } from "@/lib/utils"
import {
	type ButtonProps,
	RsButton,
} from "@/components/seller/atom/RsButton.tsx"

export interface PcButtonProps extends ButtonProps {
	children?: React.ReactNode
	isLoading?: boolean
	onClick?: () => Promise<void> | void
	isAsync?: boolean
}

function RsLoadingButton({
	children,
	isLoading: externalLoading,
	isAsync = false,
	onClick,
	...props
}: PcButtonProps) {
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
		<RsButton
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
		</RsButton>
	)
}

export default RsLoadingButton
