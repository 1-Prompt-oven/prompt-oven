"use client"

import type { ComponentProps } from "react"
import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils.ts"
import type { MenuIconType, NavQueryType } from "@/lib/navigation.ts"
import { useIsActive } from "@/hooks/navigation/useIsActive.ts"

interface SideMenuItemProps extends ComponentProps<typeof Link> {
	label: string
	Icon: MenuIconType
	_href: string
	query: NavQueryType
}

// todo: 활성화된 경로 하이라이팅 하기
function SideMenuItem({
	label,
	Icon,
	_href,
	query,
	...props
}: SideMenuItemProps) {
	const isActive = useIsActive()
	const isActiveLink = isActive({ href: _href, query })
	return (
		<Link
			{...props}
			className={cn(
				"flex h-[60px] items-center justify-between rounded-lg px-5 py-4 transition-colors hover:!bg-white/10",
				"text-white",
				isActiveLink ? "text-[#E2ADFF]" : "text-white",
				props.className,
			)}>
			<div className="flex items-center gap-3">
				<Icon className={cn("h-6 w-6")} />
				<span>{label}</span>
			</div>
		</Link>
	)
}

export default SideMenuItem
