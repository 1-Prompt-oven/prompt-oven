"use client"

import React, { useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { z } from "zod"
import { updateNickname } from "@/action/auth/updateNickname"
import { nicknameSchemaObject } from "@/schema/auth"
import GradientButton from "@/components/common/atom/GradientButton"
import SuccessModal from "@/components/common/atom/SuccessModal"
import NicknameInput from "../atom/NicknameInput"

function NicknameModifySection({ memberUUID }: { memberUUID: string }) {
	const [nickname, setNickname] = useState<string>("")
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [modalMessage, setModalMessage] = useState<string>("")

	const handleSave = async () => {
		if (!nickname) {
			setError("Enter your new nincname")
			return
		}

		try {
			nicknameSchemaObject.parse({ nickname })
		} catch (zodError) {
			if (zodError instanceof z.ZodError) {
				setError(zodError.errors[0].message)
				return
			}
		}

		setIsLoading(true)
		setError(null)

		try {
			await updateNickname({ memberUUID, nickname })
			setModalMessage("Nickname is changed")
			setIsModalOpen(true)
		} catch (err) {
			setModalMessage("Fail nickname change")
			setIsModalOpen(true)
		} finally {
			setIsLoading(false)
		}
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setNickname(value)

		try {
			nicknameSchemaObject.parse({ nickname: value })
			setError(null)
		} catch (zodError) {
			if (zodError instanceof z.ZodError) {
				setError(zodError.errors[0].message)
			}
		}
	}

	return (
		<div className="flex flex-col gap-4 py-4">
			<div className="flex items-center gap-2">
				<NicknameInput
					value={nickname}
					onChange={handleChange}
					className="w-[270px]"
					placeholder="Enter your new nickname"
				/>
				<div>
					<GradientButton
						onClick={handleSave}
						disabled={isLoading || Boolean(error)}
						className="h-[50px] w-[100px] px-[35px] py-[15px]">
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
							"Save"
						)}
					</GradientButton>
				</div>
			</div>
			{error ? <p className="text-sm text-red-500">{error}</p> : null}
			<SuccessModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)} // 모달 닫기
			>
				{modalMessage}
			</SuccessModal>
		</div>
	)
}

export default NicknameModifySection
