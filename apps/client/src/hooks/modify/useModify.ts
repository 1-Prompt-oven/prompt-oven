import { useState } from "react"
import type { CommonModifyType } from "@/types/profile/profileTypes"

interface UploadResponse {
	url: string
	signedUrl?: string
}

interface UploadError {
	message: string
}

export const useModify = (modifyData: CommonModifyType) => {
	//// 변수 관리 START ////
	const [banner, setBanner] = useState<string | undefined>(
		modifyData.bannerImageUrl ? modifyData.bannerImageUrl : "",
	)

	const [avatar, setAvatar] = useState<string | undefined>(
		modifyData.avatarImageUrl ? modifyData.avatarImageUrl : "",
	)

	const [hashTag, setHashTag] = useState<string | undefined>(
		modifyData.hashTag ? modifyData.hashTag : "",
	)

	const [nickname, setNickname] = useState<string | undefined>(
		modifyData.nickname ? modifyData.nickname : "",
	)

	const [email, setEmail] = useState<string | undefined>(
		modifyData.email ? modifyData.email : "",
	)

	const [bio, setBio] = useState<string | undefined>(
		modifyData.bio ? modifyData.bio : "",
	)
	//// 변수 관리 END ////

	//// 이미지 업로드 핸들링 START ////
	const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
	const handleImageChange = (
		setImage: React.Dispatch<React.SetStateAction<string | undefined>>,
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0]
		if (file) {
			if (file.size > MAX_FILE_SIZE) {
				// eslint-disable-next-line no-alert -- Comments to notify you of failed image upload
				alert("파일 크기가 5MB를 초과합니다. 다른 파일을 선택해 주세요.")
				event.target.value = ""
				return
			}

			const reader = new FileReader()
			reader.onloadend = () => {
				setImage(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}
	//// 이미지 업로드 핸들링 END ////

	//// 이미지 업로드 옵션 START ////
	const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleImageChange(setBanner, event)
	}

	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleImageChange(setAvatar, event)
	}
	//// 이미지 업로드 옵션 END ////

	//// RsInput START ////
	const handleInputChange = (field: string, value: string) => {
		switch (field) {
			case "hashTag":
				setHashTag(value)
				break
			case "nickname":
				setNickname(value)
				break
			case "email":
				setEmail(value)
				break
			case "bio":
				setBio(value)
				break
			default:
				break
		}
	}
	//// RsInput END ////

	//// 리셋 START ////
	const handleReset = (field: string) => {
		switch (field) {
			case "banner":
				setBanner(modifyData.bannerImageUrl ? modifyData.bannerImageUrl : "")
				break
			case "avatar":
				setAvatar(modifyData.avatarImageUrl ? modifyData.avatarImageUrl : "")
				break
			case "hashTag":
				setHashTag(modifyData.hashTag ? modifyData.hashTag : "")
				break
			case "nickname":
				setNickname(modifyData.nickname ? modifyData.nickname : "")
				break
			case "email":
				setEmail(modifyData.email ? modifyData.email : "")
				break
			case "bio":
				setBio(modifyData.bio ? modifyData.bio : "")
				break
			default:
				break
		}
	}
	//// 리셋 END ////

	//// 이미지 - S3 핸들링 START ////
	const handleImageUpload = async (
		formData: FormData,
		imageUrl: string | undefined,
		currentImageUrl: string | undefined,
		key: string,
		bucket: string,
	) => {
		if (imageUrl && imageUrl !== currentImageUrl) {
			try {
				// Only proceed if the imageUrl is a base64 string (new upload)
				if (imageUrl.startsWith("data:image")) {
					// Create a new FormData for the upload
					const uploadFormData = new FormData()

					// Convert base64 to blob
					const response = await fetch(imageUrl)
					const blob = await response.blob()

					// Create a File from the Blob with a proper name
					const fileName = `${Date.now()}-${key}.${blob.type.split("/")[1] || "png"}`
					const file = new File([blob], fileName, { type: blob.type })

					uploadFormData.append("img", file)
					uploadFormData.append("keyword", `${bucket}/${key}`)

					const uploadResponse = await fetch("/api/upload", {
						method: "POST",
						body: uploadFormData,
					})

					if (!uploadResponse.ok) {
						const errorData = (await uploadResponse.json()) as UploadError
						throw new Error(errorData.message || "Failed to upload image")
					}

					const data = (await uploadResponse.json()) as UploadResponse

					// Update the form with the S3 URL
					formData.set(key, data.url)
					return true
				}

				// If it's already an S3 URL, just use it as is
				formData.set(key, imageUrl)
				return true
			} catch (error) {
				return false
			}
		}
		// If no new image, keep the current one
		if (currentImageUrl) {
			formData.set(key, currentImageUrl)
		}
		return true
	}
	//// 이미지 - S3 핸들링 END ////

	//// 이미지 제거 핸들링 START ////
	const handleImageRemove = (field: string) => {
		switch (field) {
			case "banner":
				setBanner("")
				break
			case "avatar":
				setAvatar("")
				break
			default:
				break
		}
	}
	//// 이미지 제거 핸들링 END ////

	const handleUpload = async (file: File, keyword: string): Promise<string> => {
		const formData = new FormData()
		formData.append("img", file)
		formData.append("keyword", keyword)

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		})

		if (!response.ok) {
			const errorData = (await response.json()) as UploadError
			throw new Error(errorData.message || "Upload failed")
		}

		const data = (await response.json()) as UploadResponse
		return data.url
	}

	return {
		banner,
		avatar,
		hashTag,
		nickname,
		email,
		bio,
		handleBannerChange,
		handleAvatarChange,
		handleInputChange,

		handleImageUpload,
		handleReset,
		handleImageRemove,
		handleUpload,
	}
}
