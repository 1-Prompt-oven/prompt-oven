"use client"

import { useEffect, useState } from "react"
import type { FieldValues } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/button"
import { CheckBox } from "@repo/ui/checkbox"
import { loginSchema } from "@/schema/auth.ts"
import SignInField from "@/components/auth/molecule/SignInField.tsx"

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
	const [isClient, setIsClient] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")

	const email = watch("email")
	const password = watch("password")

	useEffect(() => {
		setIsClient(true)
	}, [])

	useEffect(() => {
		if (isClient) {
			const savedEmail = localStorage.getItem("rememberedEmail")
			const savedRememberMe = localStorage.getItem("rememberMe") === "true"

			if (savedEmail) {
				setValue("email", savedEmail)
			}
			setRememberMe(savedRememberMe)
		}
	}, [isClient, setValue])

	useEffect(() => {
		if (errorMessage) {
			setErrorMessage("")
		}
	}, [email, password])

	const loginSchemaKeys = loginSchema.keyof().enum

	const handleOnSubmitSuccess = async (data: FieldValues) => {
		signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: true,
			callbackUrl: "/",
		})
	}
	const handleOnSubmitFailure = (submissionErrors: FieldValues) => {
		// eslint-disable-next-line no-console -- Debugging form validation errors
		console.log("Form validation failed. Errors:", submissionErrors)
		setErrorMessage("Invalid email or password. Please try again.")

		return true
	}

	return (
		<div className="select-none gap-0 rounded border-none bg-[#252525] px-6 pb-12 pt-16 md:max-h-[780px] md:min-h-[780px] md:max-w-[650px] md:px-10 md:pb-16 md:pt-24">
			<div className="mb-5 flex h-fit flex-col justify-center gap-[5px] md:mb-14">
				<h1 className="text-center text-4xl font-bold text-white">
					Sign In To Your Account
				</h1>
				<p className="text-center text-[16px] font-normal leading-[26px] text-[#C1C1C1]">
					Enter your details to access your account
				</p>
			</div>
			{errorMessage && (
				<div className="mb-4 text-center text-sm text-red-500">
					{errorMessage}
				</div>
			)}
			<form
				onSubmit={handleSubmit(handleOnSubmitSuccess, handleOnSubmitFailure)}>
				<div className="mb-11 flex h-fit w-full flex-col gap-5">
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
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<CheckBox
								id="remember"
								checked={isClient && rememberMe}
								onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
								className="h-[18px] w-[18px] rounded-none border-none !bg-[#333333] shadow-[0px_0px_30px_rgba(0,0,0,0.2)] data-[state=checked]:bg-[#333333] data-[state=checked]:text-white"
							/>
							<label
								htmlFor="remember"
								className="cursor-pointer text-sm text-white">
								Remember me
							</label>
						</div>
						<Link
							href="/forgot-password"
							className="text-white hover:text-white/90">
							Forgot Password ?
						</Link>
					</div>
				</div>

				<div className="mb-8 flex h-fit w-full flex-col items-center gap-4">
					<Button
						type="submit"
						className="h-[50px] w-full rounded-[25px] !bg-[#A913F9] text-white hover:!bg-[#A913F9]/90">
						Log In
					</Button>

					<p className="text-white/70">Or login with</p>

					{/* Social Login */}
					<div className="flex justify-center space-x-4">
						<Button
							type="button"
							variant="outline"
							className="h-[48px] w-[147px] rounded-full !bg-white hover:!bg-white/90">
							<svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
								<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
							</svg>
							Apple
						</Button>
						<Button
							type="button"
							variant="outline"
							className="h-[48px] w-[147px] rounded-full !bg-white hover:!bg-white/90">
							<svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
								<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z" />
							</svg>
							Google
						</Button>
						<Button
							type="button"
							variant="outline"
							className="h-[48px] w-[147px] rounded-full !bg-white hover:!bg-white/90">
							<svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
								<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
							</svg>
							Facebook
						</Button>
					</div>
				</div>

				{/* Sign up link */}
				<div className="h-fit text-center text-[#C1C1C1]">
					<span> Don&apos;t have an account ?</span>
					<Link href="/sign-up" className="ml-4 text-white hover:text-white/90">
						Create An Account
					</Link>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
