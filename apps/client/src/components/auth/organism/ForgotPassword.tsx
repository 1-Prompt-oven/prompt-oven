"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/button"
import { forgotSchemaObject } from "@/schema/auth.ts"
import SignUpField from "@/components/auth/molecule/SignUpField.tsx"
import SignUpTimerField from "@/components/auth/molecule/SignUpTimerField.tsx"
import { useAuthTimer } from "@/hooks/auth/useAuthTimer.ts"
import {
	requestPasswordResetEmail,
	checkEmailVerificationCode,
	resetPassword,
} from "@/action/auth/forgotPasswardAction"

function ForgotPassword() {
	const [emailVerified, setEmailVerified] = useState(false)
	const {
		handleSubmit,
		register,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(forgotSchemaObject),
		mode: "onChange",
	})

	const forgotPasswordSchemaKeys = forgotSchemaObject.keyof().enum
	const email = watch(forgotPasswordSchemaKeys.email) as string
	const emailCode = watch(forgotPasswordSchemaKeys.emailCode) as string
	const password = watch(forgotPasswordSchemaKeys.password) as string
	const emailValidationTime = 180 // 3 minutes in seconds
	const [timeLeft, startTimer] = useAuthTimer({ emailValidationTime })
	const [showTimerField, setShowTimerField] = useState(true)

	const handleOnSubmitSuccess = async () => {
		if (!emailVerified) {
			setError(forgotPasswordSchemaKeys.emailCode, {
				type: "manual",
				message: "Email verification is required.",
			})
			return
		}

		try {
			await resetPassword({ email, password })
			window.location.href = "/sign-in"
		} catch (error) {
			setError(forgotPasswordSchemaKeys.password, {
				type: "manual",
				message: "Failed to reset password. Please try again.",
			})
		}
	}

	const emailValidationHandler = async () => {
		try {
			await requestPasswordResetEmail({ email })
			startTimer()
		} catch (error) {
			setError(forgotPasswordSchemaKeys.email, {
				type: "manual",
				message: "Failed to send verification email. Please try again.",
			})
		}
	}

	const emailCodeValidationHandler = async () => {
		try {
			const response = await checkEmailVerificationCode({
				email,
				code: emailCode,
			})

			if (response) {
				clearErrors(forgotPasswordSchemaKeys.emailCode)
				setEmailVerified(true)
				setShowTimerField(false)
			} else {
				setError(forgotPasswordSchemaKeys.emailCode, {
					type: "manual",
					message: "Invalid verification code.",
				})
			}
		} catch (error) {
			setError(forgotPasswordSchemaKeys.emailCode, {
				type: "manual",
				message: "Verification failed. Please try again.",
			})
		}
	}

	return (
		<div className="min-w-[500px] select-none gap-0 rounded border-none bg-[#252525] px-6 pb-12 pt-16 md:min-h-[780px] md:max-w-[650px] md:px-10 md:pb-16 md:pt-24">
			<div className="mb-5 flex h-fit flex-col justify-center gap-[5px] md:mb-14">
				<h1 className="text-center text-4xl font-bold text-white">
					Find Password
				</h1>
			</div>

			<form onSubmit={handleSubmit(handleOnSubmitSuccess)}>
				<div className="mb-11 flex h-fit w-full flex-col gap-5">
					{/* Email */}
					<SignUpField
						showButton
						labelText="Email"
						labelProps={{
							htmlFor: forgotPasswordSchemaKeys.email,
						}}
						buttonText="Validate"
						buttonProps={{
							disabled:
								Boolean(errors[forgotPasswordSchemaKeys.email]) || !email,
							type: "button",
							onClick: emailValidationHandler,
						}}
						inputProps={{
							id: forgotPasswordSchemaKeys.email,
							placeholder: "Email",
							...register(forgotPasswordSchemaKeys.email),
						}}
						errorProps={{
							name: forgotPasswordSchemaKeys.email,
							errors,
						}}
					/>

					{/* Email Code */}
					{showTimerField && timeLeft !== null && (
						<SignUpTimerField
							inputProps={{
								id: forgotPasswordSchemaKeys.emailCode,
								placeholder: "Email Verification Code",
								...register(forgotPasswordSchemaKeys.emailCode),
							}}
							buttonProps={{
								type: "button",
								disabled:
									timeLeft === 0 ||
									Boolean(errors[forgotPasswordSchemaKeys.emailCode]) ||
									!emailCode,
								onClick: emailCodeValidationHandler,
							}}
							buttonText="Check"
							errorProps={{
								name: forgotPasswordSchemaKeys.emailCode,
								errors,
							}}
							timeLeft={timeLeft}
						/>
					)}

					{/* Password */}
					<SignUpField
						labelText="New Password"
						labelProps={{
							htmlFor: forgotPasswordSchemaKeys.password,
						}}
						inputProps={{
							type: "password",
							id: forgotPasswordSchemaKeys.password,
							placeholder: "Password",
							...register(forgotPasswordSchemaKeys.password),
						}}
						errorProps={{
							name: forgotPasswordSchemaKeys.password,
							errors,
						}}
					/>

					{/* Password Confirm */}
					<SignUpField
						labelText="New Password Confirm"
						labelProps={{
							htmlFor: forgotPasswordSchemaKeys.passwordValidate,
						}}
						inputProps={{
							type: "password",
							id: forgotPasswordSchemaKeys.passwordValidate,
							placeholder: "Password Confirm",
							...register(forgotPasswordSchemaKeys.passwordValidate),
						}}
						errorProps={{
							name: forgotPasswordSchemaKeys.passwordValidate,
							errors,
						}}
					/>
				</div>

				<div className="mb-8 flex h-fit w-full flex-col items-center gap-4">
					<Button
						type="submit"
						className="h-[50px] w-full rounded-[25px] !bg-[#A913F9] text-white hover:!bg-[#A913F9]/90">
						Reset Password
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ForgotPassword
