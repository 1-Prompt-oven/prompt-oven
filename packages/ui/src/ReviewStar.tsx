"use client"

interface StarProps {
	star: number
	setStar: (value: number) => void
	noAnimation?: boolean
	color?: string
	size?: string
	className?: string
}

export default function ReviewStar({
	star,
	setStar,
	noAnimation = true,
	color = "#ffff00",
	size = "1.2rem", // 기본 크기를 설정
	className = "inline-block",
}: StarProps) {
	const changeStarHandler = (value: number) => {
		setStar(value)
	}

	return (
		<div
			className={`relative mb-1 inline-block w-fit ${className}`}
			style={{
				fontSize: size, // size prop을 사용하여 폰트 크기 설정
			}}>
			<div
				className="star-rating__background flex"
				style={{ color: "#e0e0e0" }}>
				{/* 배경 별 색상 설정 */}
				<button onClick={() => changeStarHandler(1)}>★</button>
				<button onClick={() => changeStarHandler(2)}>★</button>
				<button onClick={() => changeStarHandler(3)}>★</button>
				<button onClick={() => changeStarHandler(4)}>★</button>
				<button onClick={() => changeStarHandler(5)}>★</button>
			</div>
			<div
				className="star-rating__foreground"
				style={{
					width: star * 20,
					color,
					transition: noAnimation ? "none" : "width 0.5s ease-in-out",
					overflow: "hidden", // overflow hidden으로 칠해진 별이 바깥으로 나가지 않도록 설정
				}}>
				<button onClick={() => changeStarHandler(1)}>★</button>
				<button onClick={() => changeStarHandler(2)}>★</button>
				<button onClick={() => changeStarHandler(3)}>★</button>
				<button onClick={() => changeStarHandler(4)}>★</button>
				<button onClick={() => changeStarHandler(5)}>★</button>
			</div>
		</div>
	)
}
