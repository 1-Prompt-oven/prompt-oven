import type { PromptsType } from "@/types/prompts/promptsType"
import PromptCardAccount from "@/components/common/organism/PromptCardAccount"

interface FavoriteListProps {
	favoriteList: PromptsType[]
}

export default function FavoriteList({ favoriteList }: FavoriteListProps) {
	return (
		<div className="mx-auto">
			<ul className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{favoriteList.length > 0
					? favoriteList.map((item) => (
							<PromptCardAccount productInfo={item} key={item.productUuid} />
						))
					: null}
			</ul>
		</div>
	)
}

