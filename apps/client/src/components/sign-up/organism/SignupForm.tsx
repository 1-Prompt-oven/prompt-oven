"use client"

import React from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import FormController from "../molecule/FormController"
import ValidateButton from "../atom/Button"
import SignupButton from "../atom/SignupButton"
import Link from "next/link"
import TimerInput from "../molecule/TimerInput"

interface FormInput {
	email: string
	emailValidation: string
	password: string
	passwordConfirm: string
	nickname: string
	terms: boolean
}

const SignUpForm: React.FC = () => {
	const { control, handleSubmit } = useForm<FormInput>({
		defaultValues: {
			email: "",
			emailValidation: "",
			password: "",
			passwordConfirm: "",
			nickname: "",
			terms: false,
		},
	})

	const onSubmit: SubmitHandler<FormInput> = (data) => {
		console.log(data)
	}
	//

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex min-h-screen flex-col items-center">
			<h5 className="flex justify-center py-10 align-middle">Sign-up</h5>
			<div className="flex flex-col items-center">
				<label>E-mail</label>
				<div className="py-2">
					<div className="grid grid-cols-[10fr_2fr] gap-4">
						<FormController
							name="email"
							control={control}
							type="text"
							placeholder="example"
							className="input"
						/>
						<ValidateButton text="validate" />
					</div>
				</div>
				<div>
					<TimerInput control={control} />
				</div>

				{/* Password */}
				<label className="pt-2">Password</label>
				<div className="flex flex-col justify-between py-2">
					<FormController
						name="password"
						control={control}
						type="password"
						placeholder="Password"
					/>
				</div>

				{/* Password Confirm */}
				<label className="pt-2">Password confirm</label>
				<div className="flex flex-col py-2">
					<FormController
						name="passwordConfirm"
						control={control}
						type="password"
						placeholder="Confirm Password"
					/>
				</div>

				{/* Nickname */}
				<div className="form-group py-2">
					<label>Nickname</label>
					<div className="grid grid-cols-[10fr_2fr] gap-4">
						<FormController
							name="nickname"
							control={control}
							type="text"
							placeholder="Nickname"
						/>
						<ValidateButton text="validate" />
					</div>
				</div>

				{/* Terms Checkbox */}
				<div className="flex items-center gap-2">
					<Controller
						name="terms"
						control={control}
						render={({ field }) => (
							<input
								type="checkbox"
								checked={field.value}
								onChange={(e) => field.onChange(e.target.checked)}
								name={field.name}
								ref={field.ref}
								className="mr-2"
							/>
						)}
					/>
					<label className="flex items-center gap-1">
						<span>I accept the terms</span>
						<Link href="#" className="text-blue-500 underline">
							Read our T&Cs
						</Link>
					</label>
				</div>

				{/* Submit Button */}
				<SignupButton text="Sign UP" />
			</div>
		</form>
	)
}

export default SignUpForm
