import React from "react"

interface LinkedInSvgProps {
	width?: number | string
	height?: number | string
	color?: string
}

function LinkedInSvg({
	width = "18",
	height = "18",
	color = "#111111",
}: LinkedInSvgProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M18.0004 18V11.4074C18.0004 8.1674 17.3029 5.69238 13.5228 5.69238C11.7003 5.69238 10.4853 6.68239 9.99032 7.6274H9.94532V5.98488H6.3678V18H10.1028V12.0374C10.1028 10.4624 10.3953 8.9549 12.3303 8.9549C14.2429 8.9549 14.2654 10.7324 14.2654 12.1274V17.9775H18.0004V18Z"
				fill={color}
			/>
			<path
				d="M0.29248 5.98486H4.02751V17.9999H0.29248V5.98486Z"
				fill={color}
			/>
			<path
				d="M2.16002 0C0.967508 0 0 0.967508 0 2.16002C0 3.35253 0.967508 4.34254 2.16002 4.34254C3.35253 4.34254 4.32004 3.35253 4.32004 2.16002C4.32004 0.967508 3.35253 0 2.16002 0Z"
				fill={color}
			/>
		</svg>
	)
}

export default LinkedInSvg
