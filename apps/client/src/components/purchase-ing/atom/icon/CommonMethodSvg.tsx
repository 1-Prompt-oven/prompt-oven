export default function CommonMethodSvg({
	isActive,
	word = "CARD",
	pixel = "text-[8px]",
}: {
	isActive: boolean
	word: string
	pixel: string
}) {
	const rectColor = isActive ? "#131313" : "#7E7E7E"
	const textColor = isActive ? "black" : "white"

	return (
		<svg width="27" height="22" viewBox="0 0 27 21.5469">
			<rect width="100%" height="100%" fill={rectColor} rx="3" ry="3" />
			<text
				x="50%"
				y="50%"
				dominantBaseline="middle"
				textAnchor="middle"
				fill={textColor}
				className={`text-center ${pixel}`}>
				{word}
			</text>
		</svg>
	)
}
