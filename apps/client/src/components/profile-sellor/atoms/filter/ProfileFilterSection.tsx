"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "@repo/ui/lucide"

interface FilterSectionProps {
	title: string
	children: React.ReactNode
	defaultOpen?: boolean
}

export function ProfileFilterSection({
	title,
	children,
	defaultOpen = true,
}: FilterSectionProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen)

	return (
		<div className="border-b border-white/10 py-4">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="mb-4 flex w-full items-center justify-between text-white">
				<span className="text-sm font-bold">{title}</span>
				{isOpen ? (
					<ChevronUp className="h-4 w-4 text-white/70" />
				) : (
					<ChevronDown className="h-4 w-4 text-white/70" />
				)}
			</button>
			{isOpen ? <div className="space-y-2">{children}</div> : null}
		</div>
	)
}
