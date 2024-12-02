"use client"

import GradientButton from "@/components/common/atom/GradientButton"
import { signOut } from "next-auth/react"
import React, { useState } from "react"

function SettingsButton() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleLogout = async () => {
		setLoading(true)
		setError(null)

		try {
			await signOut({ redirect: true, callbackUrl: "/sign-in" })
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
			<GradientButton onClick={handleLogout} disabled={loading}>
				{loading ? "Logging out..." : "Logout"}
			</GradientButton>
			{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
		</div>
	)
}

export default SettingsButton
