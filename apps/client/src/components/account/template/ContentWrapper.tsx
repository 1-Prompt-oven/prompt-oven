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
			<div className="mt-12 flex-1 bg-[#1B1818] p-4 lg:mt-0 lg:p-8">
				{children}
			</div>

			{/* Overlay for mobile menu -- 햄버거를 눌렀을 때, 나오는 배경, 지금은 사용할 예정이 아니므로 주석처리만 해놓음*/}
			{/*{isMobileMenuOpen ? (*/}
			{/*	<div*/}
			{/*		role="button"*/}
			{/*		tabIndex={0}*/}
			{/*		className="z-5 fixed inset-0 bg-black bg-opacity-50 lg:hidden"*/}
			{/*		onClick={() => setIsMobileMenuOpen(false)}*/}
			{/*		onKeyDown={(e) => {*/}
			{/*			if (e.key === "Enter" || e.key === " ") {*/}
			{/*				setIsMobileMenuOpen(false)*/}
			{/*			}*/}
			{/*		}}*/}
			{/*	/>*/}
			{/*) : null}*/}
		</div>
	)
}
