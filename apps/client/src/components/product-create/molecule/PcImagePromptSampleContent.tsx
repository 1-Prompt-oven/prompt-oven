import React, { memo, useCallback, useMemo } from "react"
import Image from "next/image"
import { X } from "@repo/ui/lucide"
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
				{...provided.dragHandleProps}
				className="relative flex cursor-move items-stretch gap-2 rounded-lg border-2 border-po-gray-250 bg-transparent px-4 pb-4 pt-8 transition-[border] hover:border-po-black-50">
				<button
					type="button"
					onClick={handleRemove}
					className="text-muted-foreground hover:text-foreground absolute right-2 top-2"
					aria-label="Remove item">
					<X className="h-5 w-5" />
				</button>
				<div className="flex flex-col items-start gap-4 pr-8 sm:flex-row sm:items-center">
					<div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md">
						<Image
							src={imageUrl}
							alt="Generated content"
							fill
							className="object-cover"
						/>
					</div>
					<div className="flex-grow space-y-2">
						<p className="text-[0.875rem] leading-[160%] tracking-[-0.02em] text-slate-400">
							<span>Variables:</span>
							{Object.entries(content.value).map(([key, value]) => (
								<span key={key} className="ml-2 text-white">
									{key}: [{value}]
								</span>
							))}
						</p>
						<div className="text-muted-foreground flex items-center space-x-2 text-xs">
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
