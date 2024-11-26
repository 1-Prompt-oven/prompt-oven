import React from "react"

interface FavoritePriceProps {
	productPrice: number
}

export default function FavoritePrice({ productPrice }: FavoritePriceProps) {
	return (
		<span className="font-lato absolute bottom-2 right-3 ml-1 mt-0 !text-base text-white">
			{productPrice.toLocaleString()}$
		</span>
	)
}
