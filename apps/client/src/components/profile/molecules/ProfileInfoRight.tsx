import React from "react"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import { formatFollowers } from "@/lib/utils"
import ProfileFigures from "../atoms/info/ProfileFigures"

interface MemberRightProps {
	memberData: ProfileMemberInfoType
}

export default function ProfileInfoRight({ memberData }: MemberRightProps) {
	const formattedFollowing = formatFollowers(memberData.following)
	const formattedFollower = formatFollowers(memberData.follower)

	return (
		<div className="custom-scrollbar flex h-full max-w-[770px] flex-grow overflow-auto">
			<div className="flex w-full flex-col gap-1">
				<div className="w-full rounded-lg bg-white/40 text-sm text-white">
					<p className="mx-2 py-1">
						<span className="line-clamp-2 text-[12px]">
							{memberData.bio ? memberData.bio : "자기소개가 없습니다."}
						</span>
					</p>
				</div>
				<div className="grid h-full w-full grid-cols-1 items-center justify-center gap-4 rounded-lg bg-white/40 p-3 sm:grid-cols-2 md:grid-cols-4 md:gap-8 md:p-2">
					<ProfileFigures title="Following" content={formattedFollowing} />
					<ProfileFigures title="Follower" content={formattedFollower} />
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
		</div>
	)
}
