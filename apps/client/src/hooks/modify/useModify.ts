import { useState } from "react"
import { uploadImage } from "@/action/s3/s3UploadAction"
import type { CommonModifyType } from "@/types/modify/commonModifyTypes"

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

	//// Input START ////
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
	//// Input END ////

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
		if (imageUrl !== undefined && imageUrl !== currentImageUrl) {
			const result = await uploadImage(imageUrl, bucket)
			if (result.isSuccess) {
				//쿼리문자열 포함 URL -> 기본 URL 변경
				const splitImageUrl =
					typeof result.responseImageUrl === "string"
						? result.responseImageUrl.split("?")[0]
						: ""
				formData.set(key, splitImageUrl)
			} else {
				// eslint-disable-next-line no-alert -- Comments to notify you of failed image upload
				alert("이미지 업로드에 실패하였습니다.")
				return false // 업로드 실패 시 false 반환
			}
		}
		return true // 업로드 성공 시 true 반환
	}
	//// 이미지 - S3 핸들링 END ////

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
	}
}
