"use client"

import { useState } from "react"
import type {
	MemberInfoType,
	ReviewAndFollowType,
} from "@/types/profile/profileTypes"
import ProfileEditInfo from "../molecules/ProfileEditInfo"
import ProfileSetting from "../molecules/ProfileSetting"
import ProfileSimpleInfo from "../molecules/ProfileSimpleInfo"

interface ProfileMainProps {
	reviewAndFollowCount: ReviewAndFollowType
	memberInfo: MemberInfoType
}

export default function ProfileMain({
	reviewAndFollowCount,
	memberInfo,
}: ProfileMainProps) {
	const [isVisible, setIsVisible] = useState<boolean>(true)

	const toggleVisibility = () => {
		setIsVisible((prev) => !prev)
	}

	return (
		<>
			{/* Background & Avatar */}
			<ProfileSetting
				memberInfo={memberInfo}
				isVisible={isVisible}
				toggleVisibility={toggleVisibility}
			/>

			{/* USER INFO */}
			{isVisible ? (
				<ProfileSimpleInfo
					memberInfo={memberInfo}
					isVisible={isVisible}
					reviewAndFollowCount={reviewAndFollowCount}
				/>
			) : (
				<ProfileEditInfo memberInfo={memberInfo} />
			)}
		</>
	)
}
