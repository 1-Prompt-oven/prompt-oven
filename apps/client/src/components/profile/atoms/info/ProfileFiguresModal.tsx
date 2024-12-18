"use client"

import { useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui/dialog"
import { Button } from "@repo/ui/button"
import type { Follower } from "@/types/profile/followingType"
import FollowListItem from "../follow/FollowListItem"

interface ProfileFiguresModalProps {
	title: string
	content: number | string
	followingList?: Follower[]
	followerList?: Follower[]
}

export default function ProfileFiguresModal({
	title,
	content,
	followingList,
	followerList,
}: ProfileFiguresModalProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [list, setList] = useState<Follower[]>()

	const handleList = () => {
		if (title === "Following") {
			setList(followingList)
		} else if (title === "Follower") {
			setList(followerList)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
			<DialogTrigger>
				<div
					className="flex min-w-0 items-center justify-between gap-1 md:flex-col"
					onClick={handleList}
					role="button"
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							handleList()
						}
					}}>
					<span className="font-mulish text-gray-200 md:text-sm xl:text-base 2xl:text-xl">
						{title}
					</span>
					<span className="font-mulish text-[10px] font-bold text-white xl:text-xs 2xl:text-sm">
						{content}
					</span>
				</div>
			</DialogTrigger>
			<DialogContent
				className="flex h-[250px] w-[350px] flex-col justify-between rounded border-[1px] border-fuchsia-500 bg-black p-5"
				style={{
					boxShadow: "0px 8px 20px rgba(169, 19, 249, 0.80)",
				}}>
				<DialogHeader className="flex !flex-row items-center justify-between">
					<DialogTitle />
					<div className="flex items-center gap-4">
						<DialogDescription className="!mt-0 ml-2 text-sm text-[#C1C1C1]">
							<span>{title}</span>
						</DialogDescription>
					</div>

					<Button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						className="mr-3 bg-[#1b1b1b]">
						x
					</Button>
				</DialogHeader>

				<ul className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden rounded-sm p-1">
					{list && list.length > 0
						? list.map((member) => (
								<FollowListItem key={member.memberUuid} member={member} />
							))
						: null}
				</ul>
			</DialogContent>
		</Dialog>
	)
}
