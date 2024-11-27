import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import ProfileModifyInfo from "../organisms/ProfileModifyInfo"
import ProfileModifyTitle from "../atoms/ProfileModifyTitle"

interface ProfileModifyTemplateProps {
	memberData: ProfileMemberInfoType
}

export default function ProfileModifyTemplate({
	memberData,
}: ProfileModifyTemplateProps) {
	return (
		<section className="mx-auto mt-12 max-w-screen-xl">
			<ProfileModifyTitle />
			<ProfileModifyInfo memberData={memberData} />
		</section>
	)
}
