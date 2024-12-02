import Image from "next/image"
import React from "react"

interface ProfileAvatarProps {
	memberAvatar?: string | undefined
}

export default function ProfileAvatar({ memberAvatar }: ProfileAvatarProps) {
	// Clean and decode the URL
	const cleanImageUrl = React.useMemo(() => {
		if (!memberAvatar) return '';
		// Remove any existing query parameters
		const baseUrl = memberAvatar.split('&')[0];
		// Decode the URL if it's encoded
		return decodeURIComponent(baseUrl);
	}, [memberAvatar]);

	return (
		<div className="relative aspect-square h-full w-28 rounded-xl border-[3px] border-white bg-white md:w-auto">
			{cleanImageUrl ? (
				<Image
					src={cleanImageUrl}
					sizes="(max-width: 768px) 100vw, 360px"
					fill
					alt="avatar"
					className="rounded-xl"
					priority
					// Optionally, if still having issues:
					// unoptimized
				/>
			) : null}
		</div>
	)
}
