import React from "react"
import { ThreeDots, type ThreeDotsProps } from "react-loader-spinner"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"

interface PcLoadingProps {
	loaderProps?: ThreeDotsProps
}

function PcLoading({ loaderProps }: PcLoadingProps) {
	return (
		<div className="flex max-w-5xl flex-col gap-4">
			<AccountTitleText className="w-full">Create New Product</AccountTitleText>
			<div className="mt-6 flex flex-col items-center">
				<ThreeDots
					visible
					height="80"
					width="80"
					color="#A913F9"
					radius="9"
					ariaLabel="three-dots-loading"
					wrapperStyle={{}}
					wrapperClass=""
					{...loaderProps}
				/>
				<span className="text-xl font-medium leading-[150%] text-white">
					Loading...
				</span>
			</div>
		</div>
	)
}

export default PcLoading
