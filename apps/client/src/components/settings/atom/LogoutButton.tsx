"use client"

import React, { useState } from "react"
import { signOut } from "next-auth/react"
import { ThreeDots } from "react-loader-spinner"
import GradientButton from "@/components/common/atom/GradientButton"
import { resetLocalStorage } from "@/lib/localStorage.ts"

function LogoutButton() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleLogout = async () => {
		setLoading(true)
		setError(null)

		try {
			await signOut({ redirect: true, callbackUrl: "/sign-in" })
			resetLocalStorage()
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError("An unknown error occurred during logout.")
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<GradientButton
				onClick={handleLogout}
				disabled={loading}
				className="mx-4 w-[304px] sm:w-[340px]">
				{loading ? (
					<ThreeDots
						visible
						width="100"
						height="80"
						radius="9"
						color="#ffffff"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				) : (
					"Logout"
				)}
			</GradientButton>
			{error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
		</div>
	)
}

export default LogoutButton
