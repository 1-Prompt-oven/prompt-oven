"use client"

import React from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import ValidateButton from "../atom/Button"
import SignupButton from "../atom/SignupButton"
import Link from "next/link"
import { Input } from "../atom/Input"

interface FormInput {
	emailLocal: string
	emailValidation: string
	password: string
	passwordConfirm: string
	nickname: string
	terms: boolean
}

const SignUpForm: React.FC = () => {
	const { control, handleSubmit } = useForm<FormInput>()

	const onSubmit: SubmitHandler<FormInput> = (data) => {
		console.log(data)
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex min-h-screen flex-col items-center">
			<h5 className="flex justify-center py-10 align-middle">Sign-up</h5>
			<div className="items-centern flex flex-col">
				<div className="form--group py-2">
					<label>E-mail validation</label>
					<div className="email--input grid grid-cols-[2fr_1fr] gap-4">
						<Controller
							name="emailLocal"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									type="text"
									placeholder="example"
									className="input"
								/>
							)}
						/>
						<ValidateButton text="validate" />
					</div>
				</div>
				<div className="form-group max-w-screen-lg">
					<label>E-mail validation</label>
					<div className="email-validation flex justify-between">
						<Controller
							name="emailValidation"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									type="text"
									placeholder="Value"
									className="input"
								/>
							)}
						/>
						<span>00:00</span>

						<ValidateButton text="check" />
					</div>
				</div>

				{/* Password */}
				<div className="form-group flex flex-col justify-between">
					<label>Password</label>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								type="password"
								placeholder="Value"
								className="input"
							/>
						)}
					/>
				</div>

				{/* Password Confirm */}
				<div className="form-group flex flex-col py-2">
					<label>Password confirm</label>
					<Controller
						name="passwordConfirm"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								type="password"
								placeholder="Value"
								className="input"
							/>
						)}
					/>
				</div>

				{/* Nickname */}
				<div className="form-group flex justify-between py-2">
					<label>Nickname</label>
					<div className="nickname-input">
						<Controller
							name="nickname"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									type="text"
									placeholder="Value"
									className="input"
								/>
							)}
						/>
						<ValidateButton text="validate" />
					</div>
				</div>

				<div className="form-group terms">
					<Controller
						name="terms"
						control={control}
						render={({ field }) => {
							const { onChange, onBlur, value, name, ref } = field
							return (
								<Input
									type="checkbox"
									checked={value}
									onChange={(e) => onChange(e.target.checked)}
									name={name}
									ref={ref}
									onBlur={onBlur}
								/>
							)
						}}
					/>
					<label>I accept the terms</label>
					<Link href="#">Read our T&Cs</Link>
				</div>

				{/* Submit Button */}
				<SignupButton text="Sign UP" />
			</div>
		</form>
	)
}

export default SignUpForm
