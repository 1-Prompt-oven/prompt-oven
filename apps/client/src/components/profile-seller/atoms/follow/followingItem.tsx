"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import  { Button } from "@repo/ui/button";
import type { toggleFollow } from "@/action/profile/following";
import type { Follower } from "@/types/profile/followingType";

interface FollowingItemProps {
	follower: Follower
	onToggleFollow: typeof toggleFollow;
}

export default function FollowingItem({ follower, onToggleFollow }: FollowingItemProps) {
	return (
        <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
			<div className="flex items-center space-x-4">
				<Avatar>
					<AvatarImage src={follower.memberProfileImage} alt={follower.memberNickname} />
					<AvatarFallback>{follower.memberNickname[0].toUpperCase()}</AvatarFallback>
				</Avatar>
				<span className="font-medium">{follower.memberNickname}</span>
			</div>
			<Button
				variant={follower.isFollowing ? "outline" : "default"}
				onClick={() => onToggleFollow(follower.memberUuid, follower.isFollowing)}
			>
				{follower.isFollowing ? "팔로잉" : "팔로우"}
			</Button>
		</li>
	)
}
