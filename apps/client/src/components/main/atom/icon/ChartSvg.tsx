import React from "react"

function ChartSvg() {
	return (
		<div
			style={{
				backgroundColor: "rgba(17, 17, 17, var(--tw-bg-opacity, 1))", // 배경색
				display: "inline-block", // 인라인 요소로 표시
				padding: "4px",
				borderRadius: "4px",
				color: "#A913F9", // 아이콘 색상
			}}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				style={{ color: "#A913F9" }} // SVG 색상 적용
			>
				<path d="M12 16v5" />
				<path d="M16 14v7" />
				<path d="M20 10v11" />
				<path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
				<path d="M4 18v3" />
				<path d="M8 14v7" />
			</svg>
		</div>
	)
}

export default ChartSvg
