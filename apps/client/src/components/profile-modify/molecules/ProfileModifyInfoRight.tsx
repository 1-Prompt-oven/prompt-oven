import { formatFollowers } from "@/lib/utils"
import ProfileModifyFigures from "../atoms/ProfileModifyFigures"

interface MemberRightProps {
	bio: string | undefined
	following: number
	follower: number
	viewer: number
	sales: number
}

export default function ProfileModifyInfoRight({
	bio,
	following,
	follower,
	viewer,
	sales,
}: MemberRightProps) {
	const formattedFollowing = formatFollowers(following)
	const formattedFollower = formatFollowers(follower)

	return (
		<div className="custom-scrollbar hidden h-full max-w-[770px] flex-grow overflow-auto xs:!flex">
			<div className="flex w-full flex-col gap-1">
				<div className="w-full rounded-lg bg-white/40 text-sm text-white">
					<p className="mx-2 py-1">
						<span className="line-clamp-2 text-[12px]">
							{bio ? bio : "자기소개가 없습니다."}
						</span>
					</p>
				</div>

				<div className="grid h-full w-full grid-cols-1 items-center justify-center gap-4 rounded-lg bg-white/40 p-3 sm:grid-cols-2 md:grid-cols-4 md:gap-8 md:p-2">
					<ProfileModifyFigures
						title="Following"
						content={formattedFollowing}
					/>
					<ProfileModifyFigures title="Follower" content={formattedFollower} />
					<ProfileModifyFigures
						title="Viewer"
						content={viewer.toLocaleString()}
					/>
					<ProfileModifyFigures
						title="Sales"
						content={sales.toLocaleString()}
					/>
				</div>
			</div>
		</div>
	)
}
