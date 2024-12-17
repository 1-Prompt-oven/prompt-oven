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
	checkEmailVerificationCode,
	requestPasswordResetEmail,
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

			if (response.result) {
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
		<div className="flex justify-center px-4 pb-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24">
			<div className="w-full max-w-full bg-[#252525] px-6 py-8 sm:max-w-[500px] sm:px-8 sm:py-12 md:max-w-[800px] md:px-10 md:py-16">
				<div className="mb-5 flex flex-col justify-center gap-2 md:mb-10">
					<h1 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
						Find Password
					</h1>
				</div>
				<form
					onSubmit={handleSubmit(handleOnSubmitSuccess)}
					className="flex flex-col gap-6">
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
					{showTimerField && timeLeft !== null ? (
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
					) : null}

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

					{/* Submit Button */}
					<div className="flex items-center justify-center">
						<Button
							type="submit"
							className="w-full rounded-full bg-[#A913F9] py-3 text-white hover:bg-[#A913F9]/90 sm:py-4 sm:text-lg">
							Reset Password
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ForgotPassword
