import type { PromptsType } from "@/types/prompts/promptsType"
import FavoriteList from "../molecule/FavoriteList"
import FavoriteCountBar from "../molecule/FavoriteCountBar"

interface FavoriteContainerProps {
	favoriteList: PromptsType[]
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
