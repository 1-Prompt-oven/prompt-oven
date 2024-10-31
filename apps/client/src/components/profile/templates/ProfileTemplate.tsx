import type {
	ProfileInfoType,
	ReviewAndFollowType,
} from "@/types/profile/profileTypes"
import ProfileMain from "../organisms/ProfileMain"
import ProfilePromptList from "../organisms/ProfilePromptList"
import ProfileToMarket from "../organisms/ProfileToMarket"

interface ProfileProps {
	reviewAndFollowCount: ReviewAndFollowType
	profileData: ProfileInfoType
}

export default function ProfileTemplate({
	reviewAndFollowCount,
	profileData,
}: ProfileProps) {
	return (
		<>
			<ProfileMain
				reviewAndFollowCount={reviewAndFollowCount}
				memberInfo={profileData.memberInfo}
			/>
			<ProfilePromptList
				favoriteList={profileData.favoriteList}
				registList={profileData.registList}
			/>
			<ProfileToMarket />
		</>
	)
}
