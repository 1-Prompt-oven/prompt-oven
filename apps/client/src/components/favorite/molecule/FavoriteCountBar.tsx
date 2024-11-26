interface FavoriteCountBarProps {
	favoriteCount: number
}

export default function FavoriteCountBar({
	favoriteCount,
}: FavoriteCountBarProps) {
	return (
		<div className="gradient-filter mx-6 flex h-[3.75rem] items-center rounded-lg border border-white/20 p-4">
			<p className="font-mulish text-sm text-white">
				<span>{favoriteCount} Results</span>
			</p>
		</div>
	)
}
