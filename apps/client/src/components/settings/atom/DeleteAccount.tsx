"use client"

import React, { useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { Button } from "@repo/ui/button"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { DeleteEmail } from "@/action/auth/updateNickname"
import { resetLocalStorage } from "@/lib/localStorage.ts"
import SuccessModal from "@/components/common/atom/SuccessModal"
import DeleteComfirmModal from "./DeleteComfirmModal"

function DeleteAccount() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)
	const [modalMessage, setModalMessage] = useState<string>("")

	const handleDelete = async () => {
		setIsLoading(true)
		setError(null)
		setIsModalOpen(false) // Close confirmation modal

		try {
			await DeleteEmail()
			resetLocalStorage()
			await signOut({ redirect: true, callbackUrl: "/" })
			setModalMessage("Thank you for using our service.")
			setIsSuccessModalOpen(true)
		} catch (err) {
			setError("Delete account failed. Please contact us.")
		} finally {
			setIsLoading(false)
		}
	}

	const handleConfirmDelete = () => {
		setModalMessage("Are you sure you want to delete your account?")
		setIsModalOpen(true)
	}

	return (
		<div className="ml-4 flex-col justify-center gap-2 pt-20 sm:ml-4">
			<Button
				variant="destructive"
				className="flex h-[40px] w-[159px] items-center justify-center px-[35px] py-[15px]"
				onClick={handleConfirmDelete}
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
				<Link
					className="pl-2 text-sm text-gray-400 underline decoration-white"
					href="www.google.com">
					Contact us
				</Link>
			</p>

			{/* Confirmation Modal */}
			<DeleteComfirmModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}>
				<div>
					<p>{modalMessage}</p>
					<div className="mt-4 flex justify-center gap-2">
						<Button
							onClick={handleDelete}
							className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500">
							Confirm
						</Button>
						<Button
							onClick={() => setIsModalOpen(false)}
							className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500">
							Cancel
						</Button>
					</div>
				</div>
			</DeleteComfirmModal>

			{/* Success Modal */}
			<SuccessModal
				isOpen={isSuccessModalOpen}
				onClose={() => setIsSuccessModalOpen(false)}>
				<p>{modalMessage}</p>
			</SuccessModal>
		</div>
	)
}

export default DeleteAccount
