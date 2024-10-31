import React from "react"

interface FacebookSvgProps {
	width?: number | string
	height?: number | string
	color?: string
}

function FacebookSvg({
	width = "12",
	height = "18",
	color = "#111111",
}: FacebookSvgProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 12 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_351_4660)">
				<path
					d="M10.4678 10.125L11.001 6.86742H7.66691V4.75348C7.66691 3.86227 8.13266 2.99355 9.62591 2.99355H11.1417V0.220078C11.1417 0.220078 9.76616 0 8.45103 0C5.70528 0 3.91053 1.56023 3.91053 4.38469V6.86742H0.858398V10.125H3.91053V18H7.66691V10.125H10.4678Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_351_4660">
					<rect width={width} height={height} fill={color} />
				</clipPath>
			</defs>
		</svg>
	)
}

export default FacebookSvg
