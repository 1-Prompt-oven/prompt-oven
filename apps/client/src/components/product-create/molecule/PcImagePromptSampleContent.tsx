import React, { memo, useCallback, useMemo } from "react"
import Image from "next/image"
import { GripVertical, X } from "@repo/ui/lucide"
import type { DraggableProvided } from "@hello-pangea/dnd"

interface Content {
	name: string
	value: Record<string, string>
	result: File
}

interface PcImagePromptSampleContentProps {
	content: Content
	onRemove: () => void
	provided: DraggableProvided
}

const PcImagePromptSampleContent: React.FC<PcImagePromptSampleContentProps> =
	memo(({ content, onRemove, provided }) => {
		const imageUrl = useMemo(
			() => URL.createObjectURL(content.result),
			[content.result],
		)

		const handleRemove = useCallback(
			(e: React.MouseEvent) => {
				e.stopPropagation()
				onRemove()
			},
			[onRemove],
		)

		return (
			<li
				ref={provided.innerRef}
				{...provided.draggableProps}
				className="group relative box-border rounded-lg border-2 border-po-gray-250 bg-[#1B1818] bg-transparent p-6 shadow-sm transition-colors duration-200 hover:bg-[#2F2F2F]">
				<div
					{...provided.dragHandleProps}
					className="absolute left-4 top-1/2 -translate-y-1/2 transform cursor-move text-[#94A3B8] opacity-30 transition-opacity duration-200 group-hover:opacity-100"
					aria-label="Drag handle">
					<GripVertical className="h-6 w-6" />
				</div>
				<button
					type="button"
					onClick={handleRemove}
					className="absolute right-4 top-4 text-[#94A3B8] transition-colors duration-200 hover:text-[#E2ADFF]"
					aria-label="Remove item">
					<X className="h-5 w-5" />
				</button>
				<div className="flex flex-col items-start gap-6 pl-10 pr-8 sm:flex-row sm:items-center">
					<div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-[#A913F9]/20">
						<Image
							src={imageUrl}
							alt="Generated content"
							fill
							className="object-cover"
						/>
					</div>
					<div className="flex-grow space-y-4">
						<div className="rounded">
							<p className="text-sm text-[#94A3B8]">
								<span className="font-medium text-white">Variables:</span>
								{Object.entries(content.value).map(([key, value]) => (
									<span key={key} className="ml-2">
										{key}: {value}
									</span>
								))}
							</p>
						</div>
						<div className="flex items-center space-x-2 text-xs text-[#8F8E90]">
							<span>{content.result.name}</span>
							<span>•</span>
							<span>{(content.result.size / 1024).toFixed(2)} KB</span>
						</div>
					</div>
				</div>
			</li>
		)
	})

PcImagePromptSampleContent.displayName = "PcImagePromptSampleContent"

export default PcImagePromptSampleContent
