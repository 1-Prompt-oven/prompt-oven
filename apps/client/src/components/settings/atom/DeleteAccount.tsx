"use client"

import { signOut } from "next-auth/react"
import React, { useState } from "react"
import { Button } from "@repo/ui/button"
import Link from "next/link"
import { DeleteEmail } from "@/action/auth/updateNickname"

function DeleteAccount() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleDelete = async () => {
		setIsLoading(true)
		setError(null)

		try {
			await DeleteEmail()
			await signOut({ redirect: true, callbackUrl: "/" })
		} catch (err) {
			setError("계정 삭제 중 문제가 발생했습니다. 다시 시도해주세요.")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex flex-col items-center gap-2 pt-20">
			<Button
				variant="destructive"
				className="h-[40px] w-[159px] px-[35px] py-[15px]"
				onClick={handleDelete}
				disabled={isLoading}>
				{isLoading ? "Delete..." : "Delete Account"}
			</Button>
			{error ? <p className="text-sm text-red-500">{error}</p> : null}
			<p className="pt-10 text-sm text-gray-400">
				If you need more explanation
			</p>
			<Link
				className="text-sm text-gray-400 underline decoration-white"
				href="www.google.com">
				Contect us
			</Link>
		</div>
	)
}

export default DeleteAccount
