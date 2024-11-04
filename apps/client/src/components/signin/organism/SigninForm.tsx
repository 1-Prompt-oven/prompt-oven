import React from "react"
import { PasswordInput } from "../molecule/PasswordInput"
import { SocialLoginButton } from "../molecule/SocialLoginButton"
import Link from "next/link"
import { Input } from "@repo/ui/input"
import { Checkbox } from "@repo/ui/checkbox"
import { Button } from "@repo/ui/button"

export const SigninForm: React.FC = () => (
	<div className="flex flex-col items-center space-y-5">
		<h2 className="text-center text-4xl font-bold text-white">
			Sign In To Your Account.
		</h2>
		<p className="max-w-[479px] text-center text-[#C1C1C1]">
			Welcome! Prompt-Oven
		</p>

		<div className="mt-4 w-full max-w-[569px] space-y-4">
			<Input
				type="email"
				placeholder="Your Mail here"
				className="h-[59px] bg-[#333333] px-8 text-white/70"
			/>
			<PasswordInput />

			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Checkbox id="remember" className="bg-[#333333]" />
					<label
						htmlFor="remember"
						className="cursor-pointer text-sm text-white">
						Remember me
					</label>
				</div>
				<Link
					href="/forgot-password"
					className="text-sm text-white hover:text-white/90">
					Forgot Password?
				</Link>
			</div>

			<Button className="h-[59px] w-full rounded-[45px] bg-[#A913F9] text-black hover:bg-[#A913F9]/90">
				Log In
			</Button>

			<SocialLoginButton />

			<div className="text-center text-[#C1C1C1]">
				Don&apos;t have an account?
				<Link href="/signup" className="text-white hover:text-white/90">
					{" "}
					Create An Account
				</Link>
			</div>
		</div>
	</div>
)
