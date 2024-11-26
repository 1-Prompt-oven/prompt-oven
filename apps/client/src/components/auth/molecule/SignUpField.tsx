import type { HTMLProps } from "react"
import React, { memo } from "react"
import { Label, type LabelProps } from "@repo/ui/label"
import { Button, type ButtonProps } from "@repo/ui/button"
import { ErrorMessage } from "@hookform/error-message"
import type { FieldErrors } from "react-hook-form"
import SignUpInput from "@/components/auth/atom/SignUpInput.tsx"

interface SignUpFieldProps {
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

const SignUpField = memo(function SignUpField({
	showButton = false,
	inputProps,
	buttonProps,
	labelProps,
	buttonText,
	labelText,
	errorProps,
}: SignUpFieldProps) {
	return (
		<div>
			<Label
				htmlFor="email"
				{...labelProps}
				className={`text-[14px] font-normal leading-[22px] text-[#C1C1C1] ${labelProps?.className ?? ""}`}>
				{labelText}
			</Label>
			<div className="relative flex min-w-full items-center gap-3">
				<SignUpInput
					containerProps={{ className: "w-full mt-1" }}
					{...inputProps}
				/>
				{showButton ? (
					<Button
						{...buttonProps}
						className={`h-[50px] w-[90px] rounded !bg-[#A913F9] text-white hover:!bg-[#A913F9]/90 disabled:bg-[#0F172A]/50 ${buttonProps?.className ?? ""}`}>
						{buttonText}
					</Button>
				) : null}
			</div>
			{errorProps?.name && errorProps.errors ? (
				<ErrorMessage
					name={errorProps.name || ""}
					errors={errorProps.errors}
					render={({ message }) => {
						return <p className="mt-1 text-red-500">{message}</p>
					}}
				/>
			) : null}
		</div>
	)
})

export default SignUpField

