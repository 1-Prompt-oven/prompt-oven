import Link from "next/link"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import { STATIC_DEFAULT_AVATAR } from "@/app/static/data"
import {
	sellorFollowAction,
	sellorUnFollowAction,
} from "@/action/prompt-detail/getProductDetailFollowData"
import type { Follower } from "@/types/profile/followingType"

interface FollowListItemProps {
	member: Follower
}

export default function FollowListItem({ member }: FollowListItemProps) {
	const profileImage = member.memberProfileImage
		? member.memberProfileImage
		: STATIC_DEFAULT_AVATAR

	const [isFollow, setIsFollow] = useState<boolean>(member.isFollowing)

	const followHandler = async (state: boolean) => {
		let responseFollow

		if (state) {
			responseFollow = await sellorUnFollowAction(member.memberNickname)
		} else {
			responseFollow = await sellorFollowAction(member.memberNickname)
		}

		const result = responseFollow.result
		if (result.res) {
			setIsFollow(!isFollow)
		}
	}

	return (
		<li className="flex items-center justify-between rounded-sm p-1 text-white">
			<Link href={`/profile/seller/${member.memberNickname}`}>
				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
						<AvatarImage src={profileImage} alt={member.memberProfileImage} />
						<AvatarFallback>AU</AvatarFallback>
					</Avatar>
					<p className="ml-2 whitespace-nowrap text-white">
						<span className="font-medium">@</span>
						<span className="font-normal">{member.memberNickname}</span>
					</p>
				</div>
			</Link>
			{isFollow ? (
				<button type="button" onClick={() => followHandler(isFollow)}>
					<p className="mr-2 text-xs font-semibold">Follow</p>
				</button>
			) : (
				<button type="button" onClick={() => followHandler(isFollow)}>
					<p className="mr-2 text-xs font-semibold">UnFollow</p>
				</button>
			)}
		</li>
	)
}
