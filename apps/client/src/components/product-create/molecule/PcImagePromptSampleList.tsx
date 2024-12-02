import React from "react"
import type { DropResult } from "@hello-pangea/dnd"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import PcImagePromptSampleContent from "@/components/product-create/molecule/PcImagePromptSampleContent.tsx"
import type { ImagePromptSampleContentType } from "@/types/product/productUpsertType.ts"

interface PcImagePromptSampleListProps {
	contentFields: ImagePromptSampleContentType[]
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
								key={content.id}
								draggableId={content.id}
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
