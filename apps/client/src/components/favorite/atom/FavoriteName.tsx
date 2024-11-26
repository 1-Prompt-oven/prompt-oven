import React from "react"

interface FavoriteNameProps {
	favoriteName: string
}

export default function FavoriteName({ favoriteName }: FavoriteNameProps) {
	return (
		<h3 className="font-lato text-base font-semibold text-white">
			{favoriteName}
		</h3>
	)
}
