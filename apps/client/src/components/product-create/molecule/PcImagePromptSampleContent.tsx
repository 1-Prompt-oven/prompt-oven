import React, { useMemo, useCallback, memo } from "react"
import Image from "next/image"
import { X, GripVertical } from "@repo/ui/lucide"
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
				className="bg-card hover:bg-accent group relative rounded-lg p-4 shadow-sm transition-colors duration-200">
				<div
					{...provided.dragHandleProps}
					className="text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2 transform cursor-move opacity-50 transition-opacity duration-200 group-hover:opacity-100"
					aria-label="Drag handle">
					<GripVertical className="h-6 w-6" />
				</div>
				<button
					type="button"
					onClick={handleRemove}
					className="text-muted-foreground hover:text-destructive absolute right-2 top-2 transition-colors duration-200"
					aria-label="Remove item">
					<X className="h-5 w-5" />
				</button>
				<div className="flex flex-col items-start gap-4 pl-10 pr-8 sm:flex-row sm:items-center">
					<div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md">
						<Image
							src={imageUrl}
							alt="Generated content"
							fill
							className="object-cover"
						/>
					</div>
					<div className="flex-grow space-y-2">
						<p className="text-muted-foreground text-sm">
							<span className="text-foreground font-medium">Variables:</span>
							{Object.entries(content.value).map(([key, value]) => (
								<span key={key} className="ml-2">
									{key}: {value}
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
