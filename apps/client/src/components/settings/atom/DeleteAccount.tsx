"use client"

import { signOut } from "next-auth/react"
import React, { useState } from "react"
import { Button } from "@repo/ui/button"
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
		<div className="flex flex-col items-center gap-2 py-10">
			<p className="text-sm text-gray-400">
				계정을 삭제하면 복구할 수 없습니다.
			</p>
			<Button
				variant="destructive"
				className="h-[50px] w-[159px] px-[35px] py-[15px]"
				onClick={handleDelete}
				disabled={isLoading}>
				{isLoading ? "Delete..." : "Delete Account"}
			</Button>
			{error ? <p className="text-sm text-red-500">{error}</p> : null}
		</div>
	)
}

export default DeleteAccount
