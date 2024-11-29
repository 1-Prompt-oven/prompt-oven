import type { DetailedHTMLProps } from "react"
import React from "react"
import { Check, Upload } from "@repo/ui/lucide"
import { cn } from "@/lib/utils.ts"
import PcButton from "@/components/product-create/atom/PcButton.tsx"

interface PcSaveBarProps
	extends DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	lastSaved?: string
	onSaveDraft?: () => void
	onPublish?: () => void
}

function PcSaveBar({
	lastSaved,
	onSaveDraft,
	onPublish,
	...props
}: PcSaveBarProps) {
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
					onClick={onSaveDraft}
					className="bg-po-purple-50 px-4 py-2 hover:bg-po-purple-50">
					<span className="text-sm font-medium tracking-[-0.02em] text-white">
						Save Draft
					</span>
				</PcButton>
				<PcButton onClick={onPublish}>
					<Upload className="h-5 w-5 text-[#CBD5E1]" />
					<span className="text-sm font-medium tracking-[-0.02em] text-white">
						Publish Now
					</span>
				</PcButton>
			</div>
		</footer>
	)
}

export default PcSaveBar
