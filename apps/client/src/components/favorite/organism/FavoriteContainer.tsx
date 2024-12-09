import type { PromptsType } from "@/types/prompts/promptsType"
import FavoriteList from "../molecule/FavoriteList"

interface FavoriteContainerProps {
	favoriteList: PromptsType
}

export default function FavoriteContainer({
	favoriteList,
}: FavoriteContainerProps) {
	return (
		<div className="flex flex-col gap-8">
			{/* <FavoriteResultBar /> */}
			<div className="mx-7 mb-16 flex flex-col gap-8 md:!flex-row">
				<FavoriteList favoriteList={favoriteList.productList} />
			</div>
		</div>
	)
}
