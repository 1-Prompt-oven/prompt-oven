"use client"

import * as React from "react"
import SideMenu from "@/components/account/organism/SideMenu.tsx"
import { getUserAuthNavitems, type MenuNavItemType } from "@/lib/navigation.ts"
import type { UserAuthType } from "@/lib/userAuth.ts"

interface AccountContentWrapperProps {
	children?: React.ReactNode
	userAuth: UserAuthType
}

export default function ContentWrapper({
	children,
	userAuth,
}: AccountContentWrapperProps) {
	const menuItems: MenuNavItemType[] = getUserAuthNavitems(userAuth)
	return (
		<div className="relative flex h-[calc(100vh-80px)]">
			<SideMenu menuItems={menuItems} />
			{/* Main content */}
			<div className="relative flex-1 overflow-y-scroll bg-[#1B1818] p-6 lg:mt-0 lg:p-10">
				{children}
			</div>
		</div>
	)
}
