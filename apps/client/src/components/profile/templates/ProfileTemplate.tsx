import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import type { Follower } from "@/types/profile/followingType"
import ProfileMemberInfo from "../organisms/ProfileMemberInfo"
import ProfileTitle from "../atoms/ProfileTitle"

interface ProfileDataProps {
	memberData: ProfileMemberInfoType // 회원 정보
	followingList: Follower[]
}

export default async function ProfileTemplate({
	memberData,
	followingList,
}: ProfileDataProps) {
	return (
		<section className="mx-auto mt-4 flex min-h-[650px] max-w-screen-xl flex-col gap-20">
			<ProfileTitle />
			<ProfileMemberInfo
				memberData={memberData}
				followingList={followingList}
			/>
		</section>
	)
}
