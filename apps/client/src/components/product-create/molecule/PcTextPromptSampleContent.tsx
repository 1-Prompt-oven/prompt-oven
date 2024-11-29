import React from "react"
import type { DraggableProvided } from "@hello-pangea/dnd"
import { X } from "@repo/ui/lucide"
import _ from "lodash"
import type { TextPromptSampleContentType } from "@/types/product/productUpsertType.ts"

interface PcTextPromptSampleContentProps {
	content: TextPromptSampleContentType
	onRemove: () => void
	provided: DraggableProvided
}

function PcTextPromptSampleContent({
	content,
	onRemove,
	provided,
}: PcTextPromptSampleContentProps) {
	return (
		<li
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			className="relative flex cursor-move items-start gap-2 rounded-lg border-2 border-po-gray-250 bg-transparent px-4 pb-4 pt-8">
			<button
				type="button"
				onClick={onRemove}
				className="text-muted-foreground hover:text-foreground absolute right-2 top-2">
				<X className="h-5 w-5 text-white" />
			</button>

			<div className="grid w-1/3 gap-2">
				{_.keys(content.value).map((key) => (
					<div
						className="rounded-md bg-black p-[10px_14px] text-[0.875rem] leading-[160%] tracking-[-0.02em] text-slate-400 placeholder:text-slate-400"
						key={key}>
						<strong className="text-slate-400">{key}: </strong>
						<strong className="text-white">{content.value[key]}</strong>
					</div>
				))}
			</div>

			<div className="!h-full w-2/3 rounded-md bg-black p-[10px_14px] text-[0.875rem] font-normal leading-[160%] tracking-[-0.02em] text-[#94A3B8] placeholder-[#94A3B8]">
				{content.result}
			</div>
		</li>
	)
}

export default PcTextPromptSampleContent
