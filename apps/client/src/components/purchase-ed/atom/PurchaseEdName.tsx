import React from "react"

interface PurchaseEdNameProps {
	favoriteName: string
}

export default function PurchaseEdName({ favoriteName }: PurchaseEdNameProps) {
	return (
		<h3 className="font-lato text-base font-semibold text-white">
			{favoriteName}
		</h3>
	)
}
