import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import ProfileMemberInfo from "../organisms/ProfileMemberInfo"
import ProfileTitle from "../atoms/ProfileTitle"

interface ProfileDataProps {
	memberData: ProfileMemberInfoType // 회원 정보
}

export default async function ProfileTemplate({
	memberData,
}: ProfileDataProps) {
	return (
		<section className="mx-auto mt-4 flex min-h-[650px] max-w-screen-xl flex-col gap-20">
			<ProfileTitle />
			<ProfileMemberInfo memberData={memberData} />
		</section>
	)
}
