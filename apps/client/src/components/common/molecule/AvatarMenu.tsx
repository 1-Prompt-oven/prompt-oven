"use client"

import * as React from "react"
import { Button } from "@repo/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu"
import Link from "next/link"
import Avatar from "@/components/common/atom/Avatar"
import type { MenuNavItemType } from "@/lib/navigation.ts"
import { getUserAuthNavitems } from "@/lib/navigation.ts"
import type { UserAuthType } from "@/lib/userAuth.ts"

export interface AvatarMenuProps {
	userAuth: UserAuthType
}
export function AvatarMenu({ userAuth }: AvatarMenuProps) {
	const menuItems: MenuNavItemType[] = getUserAuthNavitems(userAuth)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative !hidden !h-12 !w-12 rounded-full border-none hover:!bg-transparent focus-visible:!ring-0 lg:!flex">
					<Avatar size={48} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-40 rounded-[6px] border-none bg-[#252525] p-4"
				align="end">
				{menuItems.map((item, index) => (
					<Link
						// eslint-disable-next-line react/no-array-index-key  -- This is a static array
						key={index}
						href={{ pathname: item.href, query: { view: item.query } }}>
						<DropdownMenuItem className="h-[56px] cursor-pointer gap-3 p-0 *:text-white *:hover:text-po-purple-50 focus:bg-[#252525]">
							<item.icon className="!h-4 !w-4" />
							<span className="text-base font-normal">{item.label}</span>
						</DropdownMenuItem>
					</Link>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
