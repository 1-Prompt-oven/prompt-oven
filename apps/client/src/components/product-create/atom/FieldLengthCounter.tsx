"use client"

import type { ReactElement } from "react"
import React from "react"

interface FieldCountWrapperProps {
	children?: ReactElement
	maxLength: number
	length: number
}

function FieldLengthCounter({
	children,
	maxLength,
	length,
}: FieldCountWrapperProps) {
	return (
		<div className="flex w-full flex-col items-end gap-1">
			{children}
			<span className="text-sm font-normal leading-[160%] tracking-[0.04em] text-[#A0A0A0]">
				{length} / {maxLength} Characters
			</span>
		</div>
	)
}

export default FieldLengthCounter
