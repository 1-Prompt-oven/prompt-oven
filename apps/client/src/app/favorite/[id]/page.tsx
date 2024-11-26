import { getFavoriteList } from "@/action/favorite/getFavoritesData"
import FavoriteTemplate from "@/components/favorite/template/FavoriteTemplate"

export default async function Favorite() {
	const favoriteList = await getFavoriteList()

	return (
		<main className="container mx-auto bg-[#111111] py-1">
			<FavoriteTemplate favoriteList={favoriteList} />
		</main>
	)
}
