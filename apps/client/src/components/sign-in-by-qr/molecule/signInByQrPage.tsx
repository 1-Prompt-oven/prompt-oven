"use client"

import React, { useEffect } from "react"
import { ThreeDots } from "react-loader-spinner"
import { signIn } from "next-auth/react"

interface SignInByQrPageProps {
	userId: string
	userPw: string
}

function SignInByQrPage({ userId, userPw }: SignInByQrPageProps) {
	useEffect(() => {
		const signInByQr = async () => {
			return signIn("credentials", {
				email: userId,
				password: userPw,
				redirect: false,
			})
		}

		signInByQr().then((response) => {
			if (response && response.ok) {
				window.location.href = "/"
			}
		})
	}, [])
	return (
		<section className="flex h-[calc(100vh-80px)] flex-col items-center justify-center">
			<ThreeDots
				visible
				width="100"
				height="80"
				color="#A913F9"
				radius="9"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				wrapperClass=""
			/>
			<span className="text-xl font-medium leading-[150%] text-white">
				Loading...
			</span>
		</section>
	)
}

export default SignInByQrPage
