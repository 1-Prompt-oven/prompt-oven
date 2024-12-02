import type { HTMLProps } from "react"
import React from "react"
import { Label, type LabelProps } from "@repo/ui/label"
import { type ButtonProps } from "@repo/ui/button"
import { ErrorMessage } from "@hookform/error-message"
import type { FieldErrors } from "react-hook-form"
import SignInInput from "@/components/auth/atom/SignInInput.tsx"

interface SignInFieldProps {
	showButton?: boolean
	inputProps?: HTMLProps<HTMLInputElement>
	buttonProps?: ButtonProps
	buttonText?: string
	labelProps?: LabelProps
	labelText?: string
	errorProps?: {
		name?: string
		errors?: FieldErrors | undefined
	}
}

function SignInField({
	inputProps,
	labelProps,
	labelText,
	errorProps,
}: SignInFieldProps) {
	return (
		<div>
			<Label
				htmlFor="id"
				{...labelProps}
				className={`text-[14px] font-normal leading-[22px] text-[#C1C1C1] ${labelProps?.className ?? ""}`}>
				{labelText}
			</Label>
			<SignInInput
				containerProps={{ className: "w-full mt-1" }}
				{...inputProps}
			/>
			{errorProps?.name && errorProps.errors ? (
				<ErrorMessage
					name={errorProps.name || ""}
					errors={errorProps.errors}
					render={(msg) => {
						return <p className="mt-1 text-red-500">{msg.message}</p>
					}}
				/>
			) : null}
		</div>
	)
}

export default SignInField

