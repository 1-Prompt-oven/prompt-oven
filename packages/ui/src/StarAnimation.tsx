"use client"

import { useEffect, useState } from "react"

interface StarProps {
	rateData: number
	isVisible?: boolean
	noAnimation?: boolean
	color?: string
	size?: string
	className?: string
}

export default function StarAnimation({
	rateData = 0,
	isVisible = true,
	noAnimation = true,
	color = "#ffff00",
	size = "1.2rem", // 기본 크기를 설정
	className = "inline-block",
}: StarProps) {
	const [ratingPercentage, setRatingPercentage] = useState(0)

	useEffect(() => {
		if (isVisible) {
			const targetPercentage = Math.min(Math.max(rateData, 0), 5) * 20
			setTimeout(() => {
				setRatingPercentage(targetPercentage)
			}, 30) // Delay for smoother transition
		}
	}, [isVisible, rateData])

	return (
		<div
			className={`relative inline-block w-fit ${className}`}
			style={{
				fontSize: size, // size prop을 사용하여 폰트 크기 설정
			}}>
			<div className="star-rating__background" style={{ color: "#e0e0e0" }}>
				{/* 배경 별 색상 설정 */}
				★★★★★
			</div>
			<div
				className="star-rating__foreground"
				style={{
					width: `${ratingPercentage}%`,
					color,
					transition: noAnimation ? "none" : "width 1.5s ease-in-out",
					overflow: "hidden", // overflow hidden으로 칠해진 별이 바깥으로 나가지 않도록 설정
				}}>
				★★★★★
			</div>
		</div>
	)
}
