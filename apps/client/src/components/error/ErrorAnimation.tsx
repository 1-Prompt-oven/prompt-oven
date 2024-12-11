export default function ErrorAnimation() {
	return (
		<div className="relative flex h-32 w-32 items-center justify-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				className="h-24 w-24">
				<defs>
					<linearGradient
						id="gradient-border"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%">
						<stop offset="0%" stopColor="#A913F9">
							<animate
								attributeName="stop-color"
								values="#A913F9;#FF5733;#A913F9"
								dur="4s"
								repeatCount="indefinite"
							/>
						</stop>
						<stop offset="100%" stopColor="#FF5733">
							<animate
								attributeName="stop-color"
								values="#FF5733;#A913F9;#FF5733"
								dur="4s"
								repeatCount="indefinite"
							/>
						</stop>
					</linearGradient>
				</defs>
				<path
					d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-1.846.634-3.542 1.688-4.897l11.209 11.209A7.946 7.946 0 0 1 12 20c-4.411 0-8-3.589-8-8zm14.312 4.897L7.103 5.688A7.948 7.948 0 0 1 12 4c4.411 0 8 3.589 8 8a7.954 7.954 0 0 1-1.688 4.897z"
					fill="none"
					stroke="url(#gradient-border)"
					strokeWidth="2"
				/>
			</svg>
		</div>
	)
}
