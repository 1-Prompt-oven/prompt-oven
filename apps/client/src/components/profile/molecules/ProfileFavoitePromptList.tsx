import type { ProfileListType } from "@/types/profile/profileTypes"
import ProfileListItem from "../atoms/ProfileListItem"
import ProfileListTitle from "../atoms/ProfileListTitle"

interface FavoliteListProps {
	promptList: ProfileListType[]
}

export default function ProfileFavoritePromptList({
	promptList,
}: FavoliteListProps) {
	return (
		<div className="my-10 flex flex-col gap-2">
			<ProfileListTitle title="Favorite Prompts" />
			<ul className="grid grid-cols-2 gap-4 xl:grid-cols-4 2xl:grid-cols-5">
				{promptList.map((item) => (
					<li
						key={item.productPrice}
						className="h-60 overflow-hidden rounded-md border border-white bg-green-300 hover:border-[#1b1b1b] xl:h-[10rem] 2xl:h-32">
						<ProfileListItem promptData={item} />
					</li>
				))}
			</ul>
		</div>
	)
}
