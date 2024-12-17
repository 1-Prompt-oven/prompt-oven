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
		setModalMessage("Are you sure delete your account")
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
				<div className="gap-2">
					<p className="flex items-center justify-center py-2 align-middle">
						{modalMessage}
					</p>
					<div className="mt-6 flex justify-center gap-2">
						<Button
							onClick={handleDelete}
							className="flex w-[35%] items-center justify-center rounded-md bg-gradient-to-b from-orange-300 via-orange-500 to-orange-600 p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-orange-400 hover:via-orange-500 hover:to-orange-600">
							Confirm
						</Button>
						<Button
							onClick={() => setIsModalOpen(false)}
							className="flex w-[35%] items-center justify-center rounded-md bg-gradient-to-b from-transparent via-black/5 to-black p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-black/10 hover:via-black/20 hover:to-black">
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
