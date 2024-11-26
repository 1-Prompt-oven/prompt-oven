"use client"

import { forwardRef } from "react"
import { CheckBox } from "@repo/ui/checkbox"
import { Label } from "@repo/ui/label"

interface TermsCheckBoxProps {
	id: string
	label?: string
	checked?: boolean
	onCheckedChange?: (value: boolean) => void
	className?: string
}

const TermsCheckBox = forwardRef<HTMLButtonElement, TermsCheckBoxProps>(
	(
		{
			id,
			label = "I accept the terms",
			checked,
			onCheckedChange,
			className,
			...props
		},
		ref,
	) => {
		return (
			<div className={`flex items-center space-x-2 ${className || ""}`}>
				<CheckBox
					id={id}
					ref={ref}
					checked={checked}
					onCheckedChange={onCheckedChange}
					className="h-[18px] w-[18px] rounded-none border-none !bg-[#333333] shadow-[0px_0px_30px_rgba(0,0,0,0.2)] data-[state=checked]:bg-[#333333] data-[state=checked]:text-white"
					{...props}
				/>
				<Label htmlFor={id} className="cursor-pointer text-sm text-white">
					{label}
				</Label>
			</div>
		)
	},
)

TermsCheckBox.displayName = "TermsCheckBox"

export default TermsCheckBox
