export default function CommonMethodSvg({
	isActive,
	word,
	pixel,
}: {
	isActive: boolean
	word: string
	pixel: string
}) {
	const rectColor = isActive ? "#131313" : "#7E7E7E"

	return (
		<svg width="27" height="22" viewBox="0 0 27 21.5469">
			<rect width="100%" height="100%" fill={rectColor} rx="3" ry="3" />
			<text
				x="50%"
				y="50%"
				dominantBaseline="middle"
				textAnchor="middle"
				style={{ fill: "white", fontSize: pixel }} // 인라인 스타일로 색상과 폰트 크기 설정
			>
				{word}
			</text>
		</svg>
	)
}
