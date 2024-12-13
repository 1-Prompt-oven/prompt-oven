"use client"

import { signOut } from "next-auth/react"
import React, { useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { Button } from "@repo/ui/button"
import Link from "next/link"
import { DeleteEmail } from "@/action/auth/updateNickname"
import { resetLocalStorage } from "@/lib/localStorage.ts"

function DeleteAccount() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleDelete = async () => {
		setIsLoading(true)
		setError(null)

		try {
			await DeleteEmail()
			await signOut({ redirect: true, callbackUrl: "/" })
			resetLocalStorage()
		} catch (err) {
			setError("Delete account fail, Contact us")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex flex-col items-center gap-2 pt-20">
			<Button
				variant="destructive"
				className="flex h-[40px] w-[159px] items-center justify-center px-[35px] py-[15px]"
				onClick={handleDelete}
				disabled={isLoading}>
				{isLoading ? (
					<ThreeDots
						visible
						height="20"
						width="30"
						radius="9"
						color="#ffffff"
						ariaLabel="three-dots-loading"
					/>
				) : (
					"Delete Account"
				)}
			</Button>
			{error ? <p className="text-sm text-red-500">{error}</p> : null}
			<p className="pt-10 text-sm text-gray-400">
				If you need more explanation
			</p>
			<Link
				className="text-sm text-gray-400 underline decoration-white"
				href="www.google.com">
				Contact us
			</Link>
		</div>
	)
}

export default DeleteAccount
