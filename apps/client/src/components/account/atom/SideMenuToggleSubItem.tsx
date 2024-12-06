"use client"

import type { ComponentProps } from "react"
import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils.ts"
import type { NavQueryType } from "@/lib/navigation.ts"
import { useIsActive } from "@/hooks/navigation/useIsActive.ts"

interface SideMenuToggleItemProps extends ComponentProps<typeof Link> {
	label: string
	suffix?: React.ReactNode
	_href: string
	query: NavQueryType
}

function SideMenuToggleSubItem({
	label,
	suffix,
	_href,
	query,
	...props
}: SideMenuToggleItemProps) {
	const isActive = useIsActive()
	const isActiveLink = isActive({ href: _href, query })
	return (
		<Link
			{...props}
			className={cn(
				"box-border flex h-[60px] items-center justify-between rounded-lg py-4 text-[#8F8E90] transition-colors hover:bg-white/10",
				isActiveLink &&
					"border-[1px] border-[#E2ADFF] bg-[#7C2FA5] *:text-white hover:bg-[#7C2FA5]",
				props.className,
			)}>
			<div className="flex items-center gap-3">
				<div className="h-6 w-6 bg-transparent" />
				<span>{label}</span>
			</div>
			{suffix}
		</Link>
	)
}

export default SideMenuToggleSubItem
