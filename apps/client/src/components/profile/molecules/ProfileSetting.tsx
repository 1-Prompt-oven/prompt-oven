import type { MemberInfoType } from "@/types/profile/profileTypes"
import ProfileAvatar from "../atoms/ProfileAvatar"
import ProfileBanner from "../atoms/ProfileBanner"
import ProfileSettingButton from "../atoms/ProfileSettingButton"

interface ProfileSettingProps {
	memberInfo: MemberInfoType
	isVisible: boolean
	toggleVisibility: () => void
}

export default function ProfileImageInfo({
	memberInfo,
	isVisible,
	toggleVisibility,
}: ProfileSettingProps) {
	return (
		<div className="relative">
			<ProfileBanner banner={memberInfo.bannerImageUrl || ""} />

			<div className="absolute left-0 right-0 top-28 mx-auto">
				<div className="mx-8 flex h-44 justify-between">
					<ProfileAvatar avatar={memberInfo.avatarImageUrl || ""} />

					{isVisible ? (
						<div className="flex w-28 items-end justify-center">
							<ProfileSettingButton
								bgColor="white"
								name="Edit Profile"
								toggleVisibility={toggleVisibility}
							/>
						</div>
					) : (
						<div className="flex w-40 items-end justify-center gap-2">
							<ProfileSettingButton
								bgColor="#1b1b1b"
								fontColor="white"
								name="Save"
								toggleVisibility={toggleVisibility}
							/>

							<div className="flex w-28 items-end justify-center">
								<ProfileSettingButton
									bgColor="white"
									name="Cancel"
									toggleVisibility={toggleVisibility}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
