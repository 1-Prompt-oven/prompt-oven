import React from "react"
import type { DraggableProvided, DropResult, DroppableProvided } from "@hello-pangea/dnd"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import type { TextPromptSampleContentType } from "@/types/product/productUpsertType.ts"
import PcTextPromptSampleContent from "@/components/product-create/molecule/PcTextPromptSampleContent.tsx"

interface ResultsListProps {
	contentFields: TextPromptSampleContentType[]
	onDragEnd: (result: DropResult) => void
	onRemove: (index: number) => void
}

function PcTextPromptSampleList({
	contentFields,
	onDragEnd,
	onRemove,
}: ResultsListProps) {
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="results">
				{(outerProvided: DroppableProvided) => (
					<ul
						className="space-y-3"
						ref={outerProvided.innerRef}>
						{contentFields.map((content, index) => (
							<Draggable
								key={content.id}
								draggableId={content.id}
								index={index}>
								{(innerProvided: DraggableProvided) => (
									<PcTextPromptSampleContent
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

export default PcTextPromptSampleList
