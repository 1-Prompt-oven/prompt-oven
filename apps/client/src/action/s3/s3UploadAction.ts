"use server"

import { v4 as uuidv4 } from "uuid"
import type { S3ResponseType } from "@/types/common/responseType"

interface UploadResponse {
	message: string
	url?: string
}

export const uploadImage = async (
	requestImageData: string,
	keyword: string,
): Promise<S3ResponseType> => {
	"use server"
	try {
		// URL에서 이미지를 가져와 Blob으로 변환
		const response = await fetch(requestImageData)
		if (!response.ok) {
			return { isSuccess: false, responseImageUrl: undefined }
		}
		const blob = await response.blob()

		const file = new File([blob], `${uuidv4()}.png`, {
			type: "image/png", // Blob의 MIME 타입을 지정
		})

		const uploadFormData = new FormData()
		uploadFormData.append("img", file)
		uploadFormData.append("keyword", keyword)

		const result: UploadResponse = await fetch(
			`${process.env.NEXTAUTH_URL}/api/upload`,
			{
				method: "POST",
				body: uploadFormData,
			},
		).then((res) => res.json())

		if (result.message === "OK") {
			return { isSuccess: true, responseImageUrl: result.url }
		}
		return { isSuccess: false, responseImageUrl: undefined }
	} catch (error) {
		return { isSuccess: false, responseImageUrl: undefined }
	}
}

