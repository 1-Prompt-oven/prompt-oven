"use client"

import React, { useEffect, useRef, useState } from "react"
import type { InputHTMLAttributes } from "react"
import { Search } from "@repo/ui/lucide"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { SearchDialogDrawer } from "../molecule/SearchDialogDrawer"

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
	width?: string
	placeholder?: string
	query?: string
}

export default function SearchInputWrapper({
	placeholder = "Search items, collection or user",
	query,
	...props
}: SearchInputProps) {
	const [shortcut, setShortcut] = useState("⌘K")
	const inputRef = useRef<HTMLInputElement>(null)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const isMac = navigator.userAgent.includes("Mac")
		setShortcut(isMac ? "⌘K" : "Ctrl+K")

		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				(isMac && e.metaKey && e.key === "k") ||
				(!isMac && e.ctrlKey && e.key === "k")
			) {
				e.preventDefault()
				setIsOpen(true)
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [])

	return (
		<div className="relative flex w-full items-center justify-end">
			{/* md 이하: Search 아이콘 */}
			<Button
				className="mr-[-2rem] h-[3rem] w-[3rem] rounded-[100%] bg-[#1B1B1B] !p-2 md:!hidden"
				onClick={() => setIsOpen(true)}>
				<Search className="!h-6 !w-6 text-[#969696]" />
			</Button>
			{/* md 이상: 검색창 */}
			<div className="hidden h-8 w-full items-center md:!flex">
				<Input
					ref={inputRef}
					value={query}
					type="text"
					placeholder={placeholder}
					{...props}
					className="h-[50px] w-full flex-grow rounded-lg bg-[#1B1B1B] py-[15px] !pl-5 !pr-[120px] text-sm text-[#969696] placeholder-[#969696] placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#666666]"
					style={{
						fontFamily: "Roboto, sans-serif",
						fontSize: "15px",
						lineHeight: "20px",
						fontWeight: 500,
					}}
					onClick={() => setIsOpen(true)}
				/>
				<div className="absolute right-2 flex items-center">
					<Search className="mr-5 h-5 w-5 text-[#969696]" />
					<Button
						variant="outline"
						size="sm"
						className="border-[#666666] bg-black text-white hover:bg-[#333333] hover:text-white">
						<span
							className="text-sm font-semibold"
							style={{ fontFamily: "Sora, sans-serif" }}>
							{shortcut}
						</span>
					</Button>
				</div>
			</div>
			<SearchDialogDrawer setIsOpen={setIsOpen} isOpen={isOpen} />
		</div>
	)
}
