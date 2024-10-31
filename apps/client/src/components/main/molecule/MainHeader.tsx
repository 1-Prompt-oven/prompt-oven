import React from "react"
import { Button } from "@repo/ui/button"
import GradientButton from "@/components/common/atom/GradientButton.tsx"
import Avatar from "@/components/common/atom/Avatar.tsx"
import SearchInput from "@/components/common/atom/SearchInput"
import MainLogo from "@/components/common/atom/icon/MainLogo.tsx"
import NavAnchor from "@/components/common/atom/NavAnchor"

export default function MainHeader() {
	return (
		<header className="flex w-full justify-center bg-[#111111]">
			<div className="mx-auto flex h-20 w-full max-w-[1716px] items-center justify-between px-4 ">
				{/* Logo */}
				<div className="pr-4">
					<MainLogo />
				</div>

				{/* Search Bar */}
				<div className="box-border hidden h-full max-w-2xl flex-1 border-x border-[#424242] px-10 md:flex">
					<SearchInput />
				</div>

				{/* Navigation */}
				<nav className="mx-4 hidden items-center gap-6 xl:flex">
					<NavAnchor href="/" color="#969696" activeColor="#A913F9">
						HOME
					</NavAnchor>
					<NavAnchor href="/prompts" color="#969696" activeColor="#A913F9">
						PROMPTS
					</NavAnchor>
					<NavAnchor
						href="/special-exhibition"
						color="#969696"
						activeColor="#A913F9">
						SPECIAL EXHIBITION
					</NavAnchor>
					<NavAnchor href="/best" color="#969696" activeColor="#A913F9">
						BEST
					</NavAnchor>
				</nav>

				{/* Right side buttons */}
				<div
					className={`
						hidden items-center
						gap-8 lg:flex
					`}>
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
			</div>
		</header>
	)
}
