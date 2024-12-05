"use client"

import React, { useState } from "react"
import { z } from "zod"
import { updateNickname } from "@/action/auth/updateNickname"
import { nicknameSchemaObject } from "@/schema/auth"
import GradientButton from "@/components/common/atom/GradientButton"
import NicknameInput from "../atom/NicknameInput"

function NicknameModifySection({ memberUUID }: { memberUUID: string }) {
	const [nickname, setNickname] = useState<string>("") // 닉네임 상태
	const [isLoading, setIsLoading] = useState<boolean>(false) // 로딩 상태
	const [error, setError] = useState<string | null>(null) // 에러 메시지

	const handleSave = async () => {
		if (!nickname) {
			setError("닉네임을 입력해주세요.")
			return
		}

		// Zod 유효성 검사
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
		} catch (err) {
			setError("닉네임 업데이트 실패. 다시 시도해주세요.")
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
					placeholder="새 닉네임을 입력하세요"
				/>
				<div>
					<GradientButton
						onClick={handleSave}
						disabled={isLoading || Boolean(error)}
						className="h-[50px] w-[100px] px-[35px] py-[15px]">
						{isLoading ? "Saving..." : "Save"}
					</GradientButton>
				</div>
			</div>
			{error ? <p className="text-sm text-red-500">{error}</p> : null}
		</div>
	)
}

export default NicknameModifySection
