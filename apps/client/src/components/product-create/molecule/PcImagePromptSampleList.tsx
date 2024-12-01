import React from "react"
import type { DropResult } from "@hello-pangea/dnd"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import PcImagePromptSampleContent from "@/components/product-create/molecule/PcImagePromptSampleContent.tsx"

interface Content {
	name: string
	value: Record<string, string>
	result: File
}

interface PcImagePromptSampleListProps {
	contentFields: Content[]
	onDragEnd: (result: DropResult) => void
	onRemove: (index: number) => void
}

function PcImagePromptSampleList({
	contentFields,
	onDragEnd,
	onRemove,
}: PcImagePromptSampleListProps) {
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="results">
				{(outerProvided) => (
					<ul
						className="space-y-2"
						{...outerProvided.droppableProps}
						ref={outerProvided.innerRef}>
						{contentFields.map((content, index) => (
							<Draggable
								key={content.name}
								draggableId={content.name}
								index={index}>
								{(innerProvided) => (
									<PcImagePromptSampleContent
										content={content}
										onRemove={() => onRemove(index)}
										provided={innerProvided}
									/>
								)}
							</Draggable>
						))}
						{outerProvided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default PcImagePromptSampleList
