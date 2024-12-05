"use client"

import type { DetailedHTMLProps } from "react"
import React, { useState } from "react"
import { Check } from "@repo/ui/lucide"
import { cn } from "@/lib/utils.ts"
import PcButton from "@/components/product-create/atom/PcButton.tsx"

interface PcSaveBarProps
	extends DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	lastSaved?: string
	isLastPage?: boolean
	onDraft: () => Promise<void>
	onNext: () => Promise<void>
	onBack?: () => void
}

function PcSaveBar({
	lastSaved,
	isLastPage,
	onDraft,
	onNext,
	onBack,
	...props
}: PcSaveBarProps) {
	const [btDraftLoading, setDraftBtLoading] = useState<boolean>(false)
	const [btNextLoading, setNextBtLoading] = useState<boolean>(false)

	const handleDraftWrapper = async () => {
		setDraftBtLoading(true)
		try {
			await onDraft()
		} finally {
			setDraftBtLoading(false)
		}
	}
	const handleNextWrapper = async () => {
		setNextBtLoading(true)
		try {
			await onNext()
		} finally {
			setNextBtLoading(false)
		}
	}

	return (
		<footer
			{...props}
			className={cn(
				"flex flex-col items-end space-y-4 md:!flex-row md:!items-center md:!space-y-0",
				lastSaved ? "justify-between" : "justify-end",
				props.className,
			)}>
			{/* Last Saved Status */}

			{lastSaved ? (
				<div className="flex items-center gap-2.5">
					<Check className="h-5 w-5 text-po-gray-250" />
					<span className="text-sm font-normal text-po-gray-250">
						Last Saved
					</span>
					<span className="text-sm font-medium text-po-black-50">
						{lastSaved}
					</span>
				</div>
			) : null}

			{/* Action Buttons */}
			<div className="flex items-center gap-2">
				<PcButton
					isLoading={btDraftLoading}
					onClick={handleDraftWrapper}
					className="w-[6.75rem] bg-po-purple-50 px-4 py-2 hover:bg-po-purple-50">
					<span className="text-sm font-medium tracking-[-0.02em] text-white">
						Save Draft
					</span>
				</PcButton>
				<PcButton
					className="box-border w-[6.75rem] border-2 border-po-purple-100 bg-[#2F2F2F]"
					onClick={onBack}>
					<span className="text-sm font-medium tracking-[-0.02em] text-white">
						Back
					</span>
				</PcButton>
				<PcButton
					className="w-[6.75rem]"
					isLoading={btNextLoading}
					onClick={handleNextWrapper}>
					<span className="text-sm font-medium tracking-[-0.02em] text-white">
						{isLastPage ? "Publish Now" : "Next"}
					</span>
				</PcButton>
			</div>
		</footer>
	)
}

export default PcSaveBar
