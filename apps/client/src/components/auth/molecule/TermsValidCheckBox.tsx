"use client"

import { forwardRef } from "react"
import type {
	FieldErrors,
	UseFormSetError,
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetValue,
	FieldValues,
} from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import TermsCheckBox from "../atom/TermsCheckBox"

interface ValidTermsCheckBoxProps<T extends FieldValues> {
	name: string
	id: string
	label?: string
	register: UseFormRegister<T>
	setValue: UseFormSetValue<T>
	errorProps?: {
		name?: string
		errors?: FieldErrors
	}
	setError: UseFormSetError<T>
	clearErrors: UseFormClearErrors<T>
}

const ValidTermsCheckBox = forwardRef<
	HTMLButtonElement,
	ValidTermsCheckBoxProps<FieldValues>
>(
	(
		{
			name,
			id,
			label = "I accept the terms",
			register,
			setValue,
			errorProps,
			setError,
			clearErrors,
			...props
		},
		ref,
	) => {
		const handleCheck = (value: boolean) => {
			setValue(name, value, { shouldValidate: true })

			if (value) {
				clearErrors(name)
			} else {
				setError(name, { type: "manual", message: "약관에 동의하셔야 합니다." })
			}
		}

		const { ref: _registerRef, ...registerProps } = register(name, {
			setValueAs: (value: boolean) => Boolean(value),
			required: "약관에 동의하셔야 합니다.",
		})

		return (
			<div className="flex flex-col space-y-2">
				<TermsCheckBox
					id={id}
					ref={ref}
					label={label}
					onCheckedChange={handleCheck}
					{...registerProps}
					{...props}
				/>
				{/* 에러 메시지 */}
				{errorProps?.name && errorProps.errors ? (
					<ErrorMessage
						name={errorProps.name}
						errors={errorProps.errors}
						render={({ message }) => (
							<p className="text-sm text-red-500">{message}</p>
						)}
					/>
				) : null}
			</div>
		)
	},
)

ValidTermsCheckBox.displayName = "ValidTermsCheckBox"

export default ValidTermsCheckBox
