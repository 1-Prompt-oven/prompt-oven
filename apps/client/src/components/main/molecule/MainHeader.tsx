"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@repo/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/dialog"
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@repo/ui/drawer"
import { Search } from "@repo/ui/lucide"
import GradientButton from "@/components/common/atom/GradientButton.tsx"
import Avatar from "@/components/common/atom/Avatar.tsx"
import MainLogo from "@/components/common/atom/icon/MainLogo.tsx"
import NavLink from "@/components/common/atom/NavLink"
import SearchInput from "@/components/common/atom/SearchInputWrapper"
import { mainNavs } from "@/lib/navigation.ts"

export default function MainHeader() {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "k") {
				event.preventDefault()
				setOpen(true)
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [])

	// const _handleSearchClick = () => {
	// 	setOpen(true)
	// }
	return (
		<header className="flex w-full justify-center bg-[#111111]">
			<div className="relative mx-auto flex h-20 w-full max-w-[1716px] items-center justify-between px-4">
				{/* Logo */}
				<div className="pr-4">
					<Link href="/">
						<MainLogo />
					</Link>
				</div>

				{/* Search Bar */}
				<button
					type="button"
					onClick={() => setOpen(!open)}
					className="box-border hidden h-full flex-1 items-center border-x border-[#424242] px-10 md:flex">
					<SearchInput />
				</button>
				{/* Mobile Search Icon */}
				<Search className="absolute right-20 h-5 w-5 text-[#969696] md:hidden" />
				{/* Navigation */}
				<ul className="mx-4 hidden items-center gap-6 xl:flex">
					{mainNavs.map((nav, index) => (
						// eslint-disable-next-line react/no-array-index-key -- index is unique
						<li key={index}>
							<NavLink href={nav.href} color="#969696" activeColor="#A913F9">
								{nav.label}
							</NavLink>
						</li>
					))}
				</ul>

				{/* Right side buttons */}
				<div className="hidden items-center gap-8 lg:flex">
					<GradientButton className="ml-4">To be Seller</GradientButton>
					<Avatar />
				</div>

				{/* Mobile menu button */}
				<div className="pl-4 lg:hidden">
					<Button
						variant="outline"
						size="icon"
						className="bg-transparent hover:bg-transparent">
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="white">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</Button>
				</div>
				<div>
					{/* 데스크탑에서는 Dialog */}
					<Dialog open={open}>
						<DialogContent className="sm:max-w-[600px]">
							<DialogHeader>
								<DialogTitle>Search</DialogTitle>
							</DialogHeader>
						</DialogContent>
					</Dialog>

					{/* 모바일에서는 Drawer */}
					<Drawer open={open} onOpenChange={setOpen}>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Search</DrawerTitle>
							</DrawerHeader>
						</DrawerContent>
					</Drawer>
				</div>
			</div>
		</header>
	)
}
