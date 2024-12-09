import type { PromptsType } from "@/types/prompts/promptsType"
import FavoriteTitle from "../atom/FavoriteTitle"
import FavoriteContainer from "../organism/FavoriteContainer"

interface PromptsTemplateProps {
	favoriteList: PromptsType
}

export default function FavoriteTemplate({
	favoriteList,
}: PromptsTemplateProps) {
	return (
		<div className="mx-auto mt-4 max-w-screen-xl">
			<FavoriteTitle />
			<FavoriteContainer favoriteList={favoriteList} />
		</div>
	)
}
