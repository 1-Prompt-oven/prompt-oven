"use client"

import * as React from "react"
import SideMenu from "@/components/account/organism/SideMenu.tsx"
import type { QueryParams } from "@/types/account/searchParams.ts"
import { sellerNavs } from "@/lib/navigation.ts"

interface AccountContentWrapperProps {
	children?: React.ReactNode
	queryParams: QueryParams
}

export default function ContentWrapper({
	children,
	queryParams,
}: AccountContentWrapperProps) {
	const view = queryParams.view as string

	return (
		<div className="relative flex h-[calc(100vh-80px)]">
			<SideMenu menuItems={sellerNavs} activeRoute={view} />

			{/* Main content */}
			<div className="relative flex-1 overflow-y-scroll bg-[#1B1818] p-6 lg:mt-0 lg:p-10">
				{children}
			</div>
		</div>
	)
}
