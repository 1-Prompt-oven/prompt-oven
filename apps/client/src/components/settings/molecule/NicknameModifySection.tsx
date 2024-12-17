"use client"

import React, { useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { z } from "zod"
import { updateNickname } from "@/action/auth/updateNickname"
import { verifyNickname } from "@/action/auth/memberManageAction"
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

	// 닉네임 저장 핸들러
	const handleSave = async () => {
		if (!nickname) {
			setError("Enter your new nickname")
			return
		}

		// Zod 스키마 유효성 검사
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
			// 닉네임 중복 확인
			const verifyResponse = await verifyNickname({ nickname })
			if (!verifyResponse.result) {
				setModalMessage("This nickname already exist.")
				setIsModalOpen(true)
				return
			}

			// 닉네임 업데이트
			await updateNickname({ memberUUID, nickname })
			setModalMessage("Nickname updated.")
			setIsModalOpen(true)
		} catch (err) {
			setModalMessage("Failed to update nickname.")
			setIsModalOpen(true)
		} finally {
			setIsLoading(false)
		}
	}

	// 닉네임 입력값 변경 핸들러
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
			<div className="mx-4 text-xl text-white">Nickname Change</div>
			<div className="flex items-center gap-2">
				<NicknameInput
					value={nickname}
					onChange={handleChange}
					className="ml-4 w-[225px] sm:w-[260px]"
					placeholder="Enter your new nickname"
				/>
				<div className="">
					<GradientButton
						onClick={handleSave}
						disabled={isLoading || Boolean(error)}
						className="h-[50px] w-[17px] px-[35px] py-[15px]">
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
