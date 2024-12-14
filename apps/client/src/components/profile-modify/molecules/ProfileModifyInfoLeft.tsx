import ProfileModifyName from "../atoms/ProfileModifyName"

interface MemberLeftProps {
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

export default function ProfileModifyInfoLeft({
	hashTag,
	nickname,
	email,
	joined,
	bio,
	following,
	follower,
	viewer,
	sales,
}: MemberLeftProps) {
	return (
		<div className="flex w-full flex-grow flex-col justify-between gap-1 xs:max-w-[160px] xl:gap-3">
			<ProfileModifyName
				hashTag={hashTag}
				nickname={nickname}
				email={email}
				joined={joined}
				bio={bio}
				following={following}
				follower={follower}
				viewer={viewer}
				sales={sales}
			/>
		</div>
	)
}
