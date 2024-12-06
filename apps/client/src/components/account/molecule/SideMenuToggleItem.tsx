"use client"

import type { HTMLAttributes } from "react"
import React from "react"
import { ChevronUp } from "@repo/ui/lucide"
import { cn } from "@/lib/utils.ts"
import SideMenuToggleSubItem from "@/components/account/atom/SideMenuToggleSubItem.tsx"
import { useSideMenuToggleStore } from "@/provider/account/sideMenuStoreProvider.tsx"
import type { MenuIconType, SubMenuItemType } from "@/lib/navigation.ts"

interface SideMenuToggleItemProps extends HTMLAttributes<HTMLDivElement> {
	label: string
	view: string
	activeRoute: string
	subMenu: SubMenuItemType[]
	Icon: MenuIconType
	subMenuProps?: HTMLAttributes<HTMLDivElement>
	containerProps?: HTMLAttributes<HTMLDivElement>
}

function SideMenuToggleItem({
	subMenu,
	activeRoute,
	label,
	view,
	Icon,
	containerProps,
	subMenuProps,
	...props
}: SideMenuToggleItemProps) {
	const { sideMenuItems, toggleSideMenuItem } = useSideMenuToggleStore(
		(state) => state,
	)
	const isOpen = Boolean(sideMenuItems.get(view))
	return (
		<div
			{...containerProps}
			className={cn("flex flex-col", containerProps?.className)}>
			<div
				role="button"
				tabIndex={0}
				onClick={() => toggleSideMenuItem(view)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						toggleSideMenuItem(view)
					}
				}}
				{...props}
				className={cn(
					"flex h-[60px] items-center justify-between rounded-lg px-5 py-4 transition-colors hover:!bg-white/10",
					// note: 상위 메뉴의 색상이 반영되려면 activeRoute 텍스트가 view를 포함하고 있어야 함
					activeRoute.includes(view) ? "text-[#E2ADFF]" : "text-white",
					props.className,
				)}>
				<div className="flex items-center gap-3">
					<Icon className="mr-2 h-5 w-5" />
					<span>{label}</span>
				</div>
				<ChevronUp
					className={cn(
						"h-5 w-5 !text-white transition-transform",
						isOpen ? "rotate-0" : "rotate-180",
					)}
				/>
			</div>
			<div
				{...subMenuProps}
				className={cn(
					"transition-max-height flex flex-col gap-2 pl-4 duration-500 ease-in",
					isOpen ? "max-h-screen" : "max-h-0 overflow-hidden",
					subMenuProps?.className,
				)}>
				{subMenu.map((item, index) => (
					<SideMenuToggleSubItem
						// eslint-disable-next-line react/no-array-index-key -- This is a static array
						key={index}
						href={{
							pathname: item.href,
							query: { view: item.query },
						}}
						view={item.query}
						label={item.label}
						activeRoute={activeRoute}
					/>
				))}
			</div>
		</div>
	)
}

export default SideMenuToggleItem
