import type { PromptsType } from "@/types/prompts/promptsType"
import FavoriteContainer from "../organism/FavoriteContainer"
import FavoriteTitle from "../atom/FavoriteTitle"

interface PromptsTemplateProps {
	favoriteList: PromptsType[]
}

export default function FavoriteTemplate({
	favoriteList,
}: PromptsTemplateProps) {
	return (
		<section className="mx-auto mt-12 max-w-screen-xl">
			<FavoriteTitle />
			<FavoriteContainer favoriteList={favoriteList} />
		</section>
	)
}
