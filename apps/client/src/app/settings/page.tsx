"use client"

import React, { useState } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const handleLogout = async () => {
		setLoading(true)
		setError(null)

		try {
			await signOut({ redirect: false }) // 세션을 제거합니다.
			router.push("/sign-in") // 로그아웃 후 리다이렉트합니다.
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
			<button
				onClick={handleLogout}
				disabled={loading}
				className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50">
				{loading ? "Logging out..." : "Logout"}
			</button>
			{error && <p className="mt-2 text-red-500">{error}</p>}
		</div>
	)
}
