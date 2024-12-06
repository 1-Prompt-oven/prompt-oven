"use client"

import type { ReactElement } from "react"
import React from "react"

interface FieldCountWrapperProps {
	children?: ReactElement
	maxLength: number
	length: number
	errMsg?: string
}

function FieldLengthCounter({
	children,
	maxLength,
	length,
	errMsg,
}: FieldCountWrapperProps) {
	return (
		<div className="flex w-full flex-col items-end gap-1">
			{children}
			<div
				className={`flex w-full items-center ${errMsg ? "justify-between" : "justify-end"}`}>
				{errMsg ? (
					<span className="text-sm font-normal leading-[160%] tracking-[0.04em] text-[#FF0000]">
						{errMsg}
					</span>
				) : null}
				<span className="text-sm font-normal leading-[160%] tracking-[0.04em] text-[#A0A0A0]">
					{length} / {maxLength} Characters
				</span>
			</div>
		</div>
	)
}

export default FieldLengthCounter
