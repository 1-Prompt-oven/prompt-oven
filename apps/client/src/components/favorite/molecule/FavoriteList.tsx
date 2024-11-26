import type { FavoriteType } from "@/types/favorite/favoriteTypes"
import FavoriteItem from "../atom/FavoriteItem"

interface FavoriteListProps {
	favoriteList: FavoriteType[]
}

export default function FavoriteList({ favoriteList }: FavoriteListProps) {
	return (
		<div className="mx-auto">
			<ul className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{favoriteList.length > 0
					? favoriteList.map((item) => (
							<FavoriteItem productInfo={item} key={item.productUUID} />
						))
					: null}
			</ul>
		</div>
	)
}
