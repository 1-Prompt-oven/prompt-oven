import React from "react"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import { formatDate, formatFollowers } from "@/lib/utils"
import ProfileFigures from "./ProfileFigures"

interface MemberNameProps {
	memberData: ProfileMemberInfoType
}

export default function ProfileName({ memberData }: MemberNameProps) {
	const formattedFollowing = formatFollowers(memberData.following)
	const formattedFollower = formatFollowers(memberData.follower)

	return (
		<div className="w-full text-xs text-white">
			<p className="mb-2 h-5 font-semibold md:text-sm">
				<span className="line-clamp-1">
					{memberData.hashTag ? `#${memberData.hashTag}` : "No HashTag"}
				</span>
			</p>
			<p className="mb-2 flex gap-6 text-[10px] xs:!flex-col xs:gap-1 sm:mb-1">
				<span className="line-clamp-1 font-semibold">
					@{memberData.nickname}
				</span>
				<span className="line-clamp-1 text-[#e5d9f2]">
					{formatDate(memberData.joined)}
				</span>
			</p>
			<p className="mb-2 h-4 text-[10px] xs:!mb-0">
				<span className="line-clamp-1">{memberData.email || "No Email"}</span>
			</p>

			<div className="flex w-full flex-col gap-1 xs:!hidden">
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
