import React from "react"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import { formatDate } from '@/lib/utils'

interface MemberNameProps {
	memberData: ProfileMemberInfoType
}

export default function ProfileName({ memberData }: MemberNameProps) {
	return (
		<div className="w-full text-xs text-white">
			<p className="mb-2 h-5 font-semibold md:text-sm">
				<span className="line-clamp-1">
					{memberData.hashTag ? `#${memberData.hashTag}` : "No HashTag"}
				</span>
			</p>
			<p className="mb-2 flex flex-col gap-1 text-[10px] sm:mb-1">
				<span className="line-clamp-1 font-semibold">
					@{memberData.nickname}
				</span>
				<span className="line-clamp-1 text-[#e5d9f2]">
					{formatDate(memberData.joined)}
				</span>
			</p>
			<p className="h-4 text-[10px]">
				<span className="line-clamp-1">
					{memberData.email || "No Email"}
				</span>
			</p>
		</div>
	)
}
