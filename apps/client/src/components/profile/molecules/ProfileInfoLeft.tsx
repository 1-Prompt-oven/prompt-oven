import { formatFollowers } from "@/lib/utils"
import type { Follower } from "@/types/profile/followingType"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import ProfileName from "../atoms/info/ProfileName"
import ProfileFigures from "../atoms/info/ProfileFigures"
import ProfileFiguresModal from "../atoms/info/ProfileFiguresModal"

interface MemberLeftProps {
	memberData: ProfileMemberInfoType
	followingList: Follower[]
}

export default async function ProfileInfoLeft({
	memberData,
	followingList,
}: MemberLeftProps) {
	const formattedFollowing = formatFollowers(memberData.following)

	return (
		<div className="flex w-full flex-grow flex-col justify-between gap-1 xs:max-w-[160px] xl:gap-3">
			<ProfileName memberData={memberData} />
			<div className="w-full rounded-lg bg-white/40 text-sm text-white xs:!hidden">
				<p className="mx-2 py-1">
					<span className="line-clamp-2 text-[12px]">
						{memberData.bio ? memberData.bio : "자기소개가 없습니다."}
					</span>
				</p>
			</div>

			<div className="grid h-full w-full grid-cols-1 items-center justify-center gap-4 rounded-lg bg-white/40 p-3 xs:!hidden sm:grid-cols-2 md:grid-cols-4 md:gap-8 md:p-2">
				<ProfileFiguresModal
					title="Following"
					content={formattedFollowing}
					followingList={followingList}
				/>
				<ProfileFigures title="Follower" content={memberData.follower} />
				<ProfileFigures
					title="Viewer"
					content={memberData.viewer.toLocaleString()}
				/>
				<ProfileFigures
					title="Sales"
					content={memberData.sales.toLocaleString()}
				/>
			</div>
		</div>
	)
}
