"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@repo/ui/button"
import { ThreeDots } from "react-loader-spinner"
import { formatDate } from "@/lib/utils"
import { modifyProfileData } from "@/action/profile/modifyProfileData"
import { useModify } from "@/hooks/modify/useModify"
import type {
	ProfileModifyType,
	ProfileMemberInfoType,
} from "@/types/profile/profileTypes"
import ProfileModifyAvatar from "../molecules/ProfileModifyAvatar"
import ProfileModifyBanner from "../molecules/ProfileModifyBanner"
import ProfileModifyInfoLeft from "../molecules/ProfileModifyInfoLeft"
import ProfileModifyInfoRight from "../molecules/ProfileModifyInfoRight"
import ProfileModifyInput from "../molecules/ProfileModifyInput"
import ProfileModifyTextarea from "../molecules/ProfileModifyTextarea"

interface MemberDataProps {
	memberData: ProfileMemberInfoType
}

export default function ProfileModifyInfo({ memberData }: MemberDataProps) {
	const router = useRouter()
	const {
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
	} = useModify(memberData)

	const [loading, setLoading] = useState<boolean>(false)

	const handleForm = async (formData: FormData) => {
		setLoading(true)

		const uploadBanner = formData.get("bannerImageUrl") as string | null
		const uploadAvatar = formData.get("avatarImageUrl") as string | null
		let bannerUrl = uploadBanner
		let avatarUrl = uploadAvatar

		// Handle banner image upload
		if (uploadBanner && uploadBanner !== memberData.bannerImageUrl) {
			const isBannerUploaded = await handleImageUpload(
				formData,
				uploadBanner,
				memberData.bannerImageUrl ?? "",
				"bannerImageUrl",
				"profile",
			)
			if (!isBannerUploaded) {
				return
			}
			// Get the updated S3 URL from formData after upload
			bannerUrl = formData.get("bannerImageUrl") as string
		}

		// Handle avatar image upload
		if (uploadAvatar && uploadAvatar !== memberData.avatarImageUrl) {
			const isAvatarUploaded = await handleImageUpload(
				formData,
				uploadAvatar,
				memberData.avatarImageUrl ?? "",
				"avatarImageUrl",
				"profile",
			)
			if (!isAvatarUploaded) {
				return
			}
			// Get the updated S3 URL from formData after upload
			avatarUrl = formData.get("avatarImageUrl") as string
		}

		// Prepare payload with updated URLs
		const payload: ProfileModifyType = {
			memberUUID: memberData.memberUUID,
			bannerImageUrl: bannerUrl ?? memberData.bannerImageUrl,
			avatarImageUrl: avatarUrl ?? memberData.avatarImageUrl,
			hashTag: formData.get("hashTag") as string,
			bio: formData.get("bio") as string,
			email: formData.get("email") as string,
			nickname: formData.get("nickname") as string,
		}

		await modifyProfileData(payload)

		// If nickname changed, wait briefly for revalidation
		if (payload.nickname !== memberData.nickname) {
			await new Promise((resolve) => {
				setTimeout(resolve, 1000)
			})
		}

		setLoading(false)

		router.refresh() // Force client-side cache refresh
		// router.push(`/profile/${payload.nickname}`)
		router.push(`/account?view=profile`)
	}

	return (
		<div className="mx-6">
			<form action={handleForm}>
				<div className="mx-2">
					<ProfileModifyBanner
						memberBanner={banner}
						handleFileChange={handleBannerChange}
						handleReset={handleReset}
						handleImageRemove={handleImageRemove}
					/>
					<div className="relative -top-[3.5rem] z-[5] mx-10 flex flex-col gap-4 md:-top-[5.5rem] md:h-40 md:!flex-row md:items-center md:justify-between xl:h-44">
						<ProfileModifyAvatar
							memberAvatar={avatar}
							handleFileChange={handleAvatarChange}
							handleReset={handleReset}
							handleImageRemove={handleImageRemove}
						/>

						<div className="flex flex-grow justify-between gap-2 rounded-xl bg-gradient-to-r from-[#B514F1] to-[#0BA9FF] p-4 md:h-[90%] md:items-center">
							<ProfileModifyInfoLeft
								hashTag={hashTag}
								nickname={nickname}
								email={email}
								joined={formatDate(memberData.joined)}
								bio={bio}
								following={memberData.following}
								follower={memberData.follower}
								viewer={memberData.viewer}
								sales={memberData.sales}
							/>
							<ProfileModifyInfoRight
								bio={bio}
								following={memberData.following}
								follower={memberData.follower}
								viewer={memberData.viewer}
								sales={memberData.sales}
							/>
						</div>
					</div>
				</div>

				{loading ? (
					<div className="mb-8 flex flex-col items-center justify-center">
						<ThreeDots
							visible
							height="80"
							width="80"
							color="#A913F9"
							radius="9"
							ariaLabel="three-dots-loading"
							wrapperStyle={{}}
							wrapperClass=""
						/>
						<span className="text-xl font-medium leading-[150%] text-white">
							Loading...
						</span>
					</div>
				) : null}

				<div className="mx-auto mb-8 flex w-[90%] flex-col gap-8 sm:flex-row">
					<div className="flex flex-col justify-between gap-8 sm:w-[50%]">
						<ProfileModifyInput
							title="#해시태그"
							inputName="hashTag"
							inputValue={hashTag}
							handleValue="hashTag"
							placeholder="해시태그를 입력해주세요... (기본적으로 앞에 #이 붙습니다.)"
							handleInputChange={handleInputChange}
							handleReset={handleReset}
						/>

						<ProfileModifyInput
							title="@닉네임"
							inputName="nickname"
							inputValue={nickname}
							handleValue="nickname"
							placeholder="닉네임을 입력해주세요... (기본적으로 앞에 @이 붙습니다.)"
							handleInputChange={handleInputChange}
							handleReset={handleReset}
						/>

						<ProfileModifyInput
							title="이메일"
							inputName="email"
							inputValue={email}
							handleValue="email"
							placeholder="이메일을 입력해주세요...."
							handleInputChange={handleInputChange}
							handleReset={handleReset}
						/>
					</div>

					<ProfileModifyTextarea
						title="자기소개"
						inputName="bio"
						inputValue={bio}
						handleValue="bio"
						placeholder="자기소개를 입력해주세요...."
						handleInputChange={handleInputChange}
						handleReset={handleReset}
					/>
				</div>

				<div className="mx-auto flex w-[90%] justify-end py-12">
					<Link
						href={`/profile/${nickname}`}
						className="px-10py-6 inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gradient-to-r from-[#FFCCDF] to-[#FFB6C1] px-10 py-6 text-sm font-medium text-white shadow transition-colors hover:from-[#FFB6C1] hover:to-[#FF69B4] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
						<span className="font-semibold text-gray-500">취소</span>
					</Link>

					<Button
						type="submit"
						className="ml-4 bg-gradient-to-r from-[#B514F1] to-[#0BA9FF] px-10 py-6 hover:from-[#A213D6] hover:to-[#0094D8]">
						<span className="font-semibold">수정</span>
					</Button>
				</div>
			</form>
		</div>
	)
}
