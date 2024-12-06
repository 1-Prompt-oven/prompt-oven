import type { ReactElement } from "react";
import React, { cloneElement, forwardRef } from "react"
import { RsInput } from "@/components/seller/atom/RsInput"
import { RsLabel } from "@/components/seller/atom/RsLabel"

interface FormFieldProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
	id: string
	label: string
	error?: string
	InputComponent?: ReactElement
}

export const RsFormField = forwardRef<HTMLInputElement, FormFieldProps>(
	({ id, label, error, InputComponent, ...props }, ref) => {
		return (
			<div className="space-y-2">
				<RsLabel htmlFor={id}>{label}</RsLabel>
				{InputComponent ? (
					cloneElement(InputComponent, { id, ...props })
				) : (
					<RsInput id={id} {...props} ref={ref} aria-invalid={Boolean(error)} />
				)}
				{error ? <p className="text-red-500">{error}</p> : null}
			</div>
		)
	},
)

RsFormField.displayName = "RsFormField"
