import React, { memo, type HTMLProps } from "react"
import { Button, type ButtonProps } from "@repo/ui/button"
import type { FieldErrors } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import SignUpInput from "@/components/auth/atom/SignUpInput.tsx"

interface SignUpTimerFieldProps {
	inputProps?: HTMLProps<HTMLInputElement>
	buttonProps?: ButtonProps
	buttonText?: string
	errorProps?: {
		name?: string
		errors?: FieldErrors | undefined
	}
	timeLeft: number | null
}

const SignUpTimerField = memo(function SignUpTimerField({
	inputProps,
	buttonProps,
	buttonText,
	errorProps,
	timeLeft,
}: SignUpTimerFieldProps) {
	const formatTime = (time: number | null) => {
		if (time === null) return "00:00"
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
	}

	return (
		<div className="relative">
			<div className="relative flex min-w-full items-center gap-3">
				<div className="relative flex-grow">
					<SignUpInput
						containerProps={{ className: "w-full" }}
						{...inputProps}
					/>
					<div className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#C1C1C1]">
						{formatTime(timeLeft)}
					</div>
				</div>
				<Button
					{...buttonProps}
					className={`h-[50px] w-[90px] rounded !bg-[#A913F9] text-white hover:!bg-[#A913F9]/90 disabled:bg-[#0F172A]/50 ${buttonProps?.className ?? ""}`}>
					{buttonText}
				</Button>
			</div>
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
})

export default SignUpTimerField

