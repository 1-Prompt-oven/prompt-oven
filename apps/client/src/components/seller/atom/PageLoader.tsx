import React from "react"
import { ThreeDots } from "react-loader-spinner"

function PageLoader() {
	return (
		<div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
			<ThreeDots
				visible
				width="100"
				height="80"
				radius="9"
				color="#A913F9"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				wrapperClass=""
			/>
		</div>
	)
}

export default PageLoader
