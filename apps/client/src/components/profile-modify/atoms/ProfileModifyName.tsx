interface MemberNameProps {
	hashTag: string | undefined
	nickname: string | undefined
	email: string | undefined
	joined: string
}

export default function ProfileModifyName({
	hashTag,
	nickname,
	email,
	joined,
}: MemberNameProps) {
	return (
		<div className="w-full text-xs text-white">
			<p className="mb-2 h-5 font-semibold md:text-sm">
				<span className="line-clamp-1">
					{hashTag ? `#${hashTag}` : "No HashTag"}
				</span>
			</p>
			<p className="mb-2 flex flex-col gap-1 text-[10px] sm:mb-1">
				<span className="line-clamp-1 font-semibold">@{nickname}</span>
				<span className="line-clamp-1 text-[#e5d9f2]">{joined}</span>
			</p>
			<p className="h-4 text-[10px]">
				<span className="line-clamp-1">{email ? email : "No Email"}</span>
			</p>
		</div>
	)
}
