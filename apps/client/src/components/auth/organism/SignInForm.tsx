"use client"

import { useEffect, useState } from "react"
import type { FieldValues } from "react-hook-form"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/button"
import { CheckBox } from "@repo/ui/checkbox"
import { loginSchema } from "@/schema/auth.ts"
import SignInField from "@/components/auth/molecule/SignInField.tsx"
import SuccessModal from "@/components/common/atom/SuccessModal"

function SignInForm() {
	const {
		handleSubmit,
		register,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	})
	const loginSchemaKeys = loginSchema.keyof().enum
	const [rememberMe, setRememberMe] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [loginType, setLoginType] = useState<
		"credentials" | "google" | "kakao" | "naver" | null
	>(null)
	const email = watch("email")
	const password = watch("password")
	const [successModalOpen, setSuccessModalOpen] = useState(false)
	const [modalMessage, setModalMessage] = useState<string | null>(null)
	const [modalCallback, setModalCallback] = useState<(() => void) | null>(null)
	//rememberMe
	useEffect(() => {
		if (typeof window !== "undefined") {
			const savedRememberMe = localStorage.getItem("rememberMe") === "true"
			const savedEmail = localStorage.getItem("rememberedEmail")

			if (savedRememberMe) {
				setRememberMe(true)
				if (savedEmail) {
					setValue("email", savedEmail)
				}
			}
		}
	}, [setValue])

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (rememberMe) {
				localStorage.setItem("rememberMe", "true")
				localStorage.setItem("rememberedEmail", (email as string) || "")
			} else {
				localStorage.setItem("rememberMe", "false")
				localStorage.removeItem("rememberedEmail")
			}
		}
	}, [rememberMe, email])

	useEffect(() => {
		if (errorMessage) {
			setErrorMessage("")
		}
	}, [email, errorMessage, password])

	// login success
	const handleOnSubmitSuccess = async (data: FieldValues) => {
		if (!loginType) {
			showSuccessModal("Login type is not selected. Please try again.")
			return
		}
		const response = await signIn(loginType, {
			email: data.email,
			password: data.password,
			redirect: false,
		})

		if (response && response.ok) {
			showSuccessModal("Login successful!", () => {
				window.location.href = response.url || "/"
			})
		} else {
			showSuccessModal("Login failed. Please try again.")
		}
	}
	//login fail
	const handleOnSubmitFailure = () => {
		showSuccessModal("Sign-in fail")
		return true
	}
	const handleLoginClick = (type: "credentials") => {
		setLoginType(type)
	}
	//social
	const handleSocialLogin = async (provider: "google" | "kakao" | "naver") => {
		try {
			const response = await signIn(provider, {
				redirect: true,
				callbackUrl: "/",
			})

			if (!response?.ok) {
				setErrorMessage("Social login failed. Please try again.")
			}
		} catch (error) {
			setErrorMessage(
				"An error occurred during social login. Please try again.",
			)
		}
	}
	//showmodal
	const showSuccessModal = (message: string, onConfirm?: () => void) => {
		setModalMessage(message)
		setSuccessModalOpen(true)
		setModalCallback(() => onConfirm || null)
	}
	const closeSuccessModal = () => {
		setSuccessModalOpen(false)
		setModalMessage(null)
		if (modalCallback) modalCallback()
		setModalCallback(null)
	}
	return (
		<div className="md: select-none gap-0 rounded border-none bg-[#252525] px-4 pb-8 pt-12 sm:max-w-[400px] sm:px-6 sm:pb-12 sm:pt-16 md:max-w-[600px] md:px-10 md:pb-16 md:pt-24">
			<div className="mb-5 flex h-fit flex-col justify-center gap-[5px] md:mb-14">
				<h1 className="px-5 text-center text-2xl font-bold text-white sm:text-2xl md:text-4xl">
					Sign In To Your Account
				</h1>
				<p className="text-center text-sm font-normal leading-[22px] text-[#C1C1C1] sm:text-[16px] sm:leading-[26px]">
					Enter your details to access your account
				</p>
			</div>

			{errorMessage ? (
				<div className="mb-4 text-center text-xs text-red-500 sm:text-sm">
					{errorMessage}
				</div>
			) : null}

			<form
				className="flex flex-col items-center justify-center"
				onSubmit={handleSubmit(handleOnSubmitSuccess, handleOnSubmitFailure)}>
				<div className="mb-11 flex h-fit w-full flex-col gap-7 px-5 sm:min-w-[350px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[500px]">
					{/* Email */}
					<SignInField
						showButton
						labelText="Email"
						labelProps={{
							htmlFor: loginSchemaKeys.email,
						}}
						inputProps={{
							id: loginSchemaKeys.email,
							placeholder: "Email",
							...register(loginSchemaKeys.email),
						}}
						errorProps={{
							name: loginSchemaKeys.email,
							errors,
						}}
					/>

					{/* Password */}
					<SignInField
						showButton
						labelText="Password"
						labelProps={{
							htmlFor: loginSchemaKeys.password,
						}}
						inputProps={{
							type: "password",
							id: loginSchemaKeys.password,
							placeholder: "Password",
							...register(loginSchemaKeys.password),
						}}
						errorProps={{
							name: loginSchemaKeys.password,
							errors,
						}}
					/>

					{/* Remember me and Forgot Password */}
					<div className="flex flex-wrap items-center justify-between">
						<div className="flex items-center space-x-2">
							<CheckBox
								id="remember"
								checked={rememberMe}
								onCheckedChange={(checked: boolean) => {
									setRememberMe(checked)
								}}
								className="h-[18px] w-[18px] rounded-none border-none !bg-[#333333] shadow-[0px_0px_30px_rgba(0,0,0,0.2)] data-[state=checked]:bg-[#333333] data-[state=checked]:text-white"
							/>
							<label
								htmlFor="remember"
								className="cursor-pointer text-xs text-white sm:text-sm">
								Remember me
							</label>
						</div>
						<Link
							href="/forgot-password"
							className="text-xs text-white hover:text-white/90 sm:text-sm">
							Forgot Password?
						</Link>
					</div>
				</div>

				<div className="mb-8 flex h-fit w-full flex-col items-center gap-4">
					<Button
						type="submit"
						onClick={() => handleLoginClick("credentials")}
						className="h-[48px] w-full min-w-[200px] rounded-[25px] !bg-[#A913F9] text-sm text-white hover:!bg-[#A913F9]/90 sm:h-[50px] sm:max-w-[300px] sm:px-6 sm:text-base md:max-w-[400px] lg:max-w-[400px]">
						Log In
					</Button>

					<p className="text-xs text-white/70 sm:text-sm">Or login with</p>

					{/* Social Login */}
					<div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:max-w-[450px] lg:max-w-[450px]">
						<Button
							type="button"
							onClick={() => handleSocialLogin("naver")}
							variant="outline"
							className="h-[40px] w-[100px] rounded-full !bg-white hover:!bg-white/90 sm:h-[40px] sm:w-[120px] md:w-[140px]">
							<svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
								<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
							</svg>
							Naver
						</Button>
						<Button
							type="button"
							onClick={() => handleSocialLogin("google")}
							variant="outline"
							className="h-[40px] w-[100px] rounded-full !bg-white hover:!bg-white/90 sm:h-[40px] sm:w-[120px] md:w-[140px]">
							<svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
								<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z" />
							</svg>
							Google
						</Button>
						<Button
							type="button"
							onClick={() => handleSocialLogin("kakao")}
							variant="outline"
							className="h-[40px] w-[100px] rounded-full !bg-white hover:!bg-white/90 sm:h-[40px] sm:w-[120px] md:w-[140px]">
							<svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
								<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
							</svg>
							KaKao
						</Button>
					</div>
				</div>

				{/* Sign up link */}
				<div className="h-fit text-center text-xs text-[#C1C1C1] sm:text-sm">
					<span> Don&apos;t have an account?</span>
					<Link href="/sign-up" className="ml-4 text-white hover:text-white/90">
						Create An Account
					</Link>
				</div>
			</form>

			{/* SuccessModal */}
			<SuccessModal isOpen={successModalOpen} onClose={closeSuccessModal}>
				{modalMessage}
			</SuccessModal>
		</div>
	)
}

export default SignInForm
