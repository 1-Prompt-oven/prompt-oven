import type { ProfileListType } from "@/types/profile/profileTypes"
import SearchInput from "@/components/common/atom/SearchInput"
import ProfileFavoritePromptList from "../molecules/ProfileFavoitePromptList"
import ProfileRegistPromptList from "../molecules/ProfileRegistPromptList"

interface ProfileListProps {
	favoriteList: ProfileListType[]
	registList: ProfileListType[]
}

export default function ProfilePromptList({
	favoriteList,
	registList,
}: ProfileListProps) {
	return (
		<>
			{/* USER Prompt List */}
			<div>
				<SearchInput placeholder={`Search @name's prompts`} />
				<ProfileFavoritePromptList promptList={favoriteList} />
				<ProfileRegistPromptList promptList={registList} />
			</div>
		</>
	)
}
