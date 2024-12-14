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
		<section className="mx-auto mt-4 flex min-h-[650px] max-w-screen-xl flex-col gap-14">
			<ProfileModifyTitle />
			<ProfileModifyInfo memberData={memberData} />
		</section>
	)
}
