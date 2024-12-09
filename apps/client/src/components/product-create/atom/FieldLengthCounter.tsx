"use client"

import type { ReactElement } from "react"
import React from "react"
import PcErrorMessage from "@/components/product-create/atom/PcErrorMessage.tsx"

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
				{errMsg ? <PcErrorMessage errorMessage={errMsg} /> : null}
				<span className="text-sm font-normal leading-[160%] tracking-[0.04em] text-[#A0A0A0]">
					{length} / {maxLength} Characters
				</span>
			</div>
		</div>
	)
}

export default FieldLengthCounter
