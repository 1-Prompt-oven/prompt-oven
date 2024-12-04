import type { PromptItemType } from "@/types/prompts/promptsType"
import FavoriteCountBar from "../molecule/FavoriteCountBar"
import FavoriteList from "../molecule/FavoriteList"

interface FavoriteContainerProps {
	favoriteList: PromptItemType[]
}

export default function FavoriteContainer({
	favoriteList,
}: FavoriteContainerProps) {
	return (
		<div className="flex flex-col gap-8">
			<FavoriteCountBar favoriteCount={favoriteList.length} />
			<div className="mx-auto mb-16 flex flex-col gap-8 md:!flex-row">
				<FavoriteList favoriteList={favoriteList} />
			</div>
		</div>
	)
}
