import ProfileModifyFigures from "./ProfileModifyFigures"

interface MemberNameProps {
	hashTag: string | undefined
	nickname: string | undefined
	email: string | undefined
	joined: string
	bio: string | undefined
	following: number
	follower: number
	viewer: number
	sales: number
}

export default function ProfileModifyName({
	hashTag,
	nickname,
	email,
	joined,
	bio,
	following,
	follower,
	viewer,
	sales,
}: MemberNameProps) {
	return (
		<div className="w-full text-xs text-white">
			<p className="mb-2 h-5 font-semibold md:text-sm">
				<span className="line-clamp-1">
					{hashTag ? `#${hashTag}` : "No HashTag"}
				</span>
			</p>
			<p className="mb-2 flex gap-6 text-[10px] xs:!flex-col xs:!gap-1 sm:mb-1">
				<span className="line-clamp-1 font-semibold">@{nickname}</span>
				<span className="line-clamp-1 text-[#e5d9f2]">{joined}</span>
			</p>
			<p className="h-4 text-[10px]">
				<span className="line-clamp-1">{email ? email : "No Email"}</span>
			</p>
			<div className="w-full flex-col gap-2 xs:!hidden">
				<div className="mb-2 w-full rounded-lg bg-white/40 text-sm text-white">
					<p className="mx-2 py-1">
						<span className="line-clamp-2 text-[12px]">
							{bio ? bio : "자기소개가 없습니다."}
						</span>
					</p>
				</div>

				<div className="grid h-full w-full grid-cols-1 items-center justify-center gap-4 rounded-lg bg-white/40 p-3 sm:grid-cols-2 md:grid-cols-4 md:gap-8 md:p-2">
					<ProfileModifyFigures title="Following" content={following} />
					<ProfileModifyFigures title="Follower" content={follower} />
					<ProfileModifyFigures title="Viewer" content={viewer} />
					<ProfileModifyFigures title="Sales" content={sales} />
				</div>
			</div>
		</div>
	)
}
