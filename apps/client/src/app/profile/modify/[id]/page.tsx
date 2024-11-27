import { getProfileMemberInfo } from "@/action/profile/getProfileData"
import ProfileModifyTemplate from "@/components/profile-modify/templates/ProfileModifyTemplate"

export default async function ProfileModify() {
	const memberData = await getProfileMemberInfo()

	return (
		<main className="container mx-auto bg-[#111111] py-1">
			<ProfileModifyTemplate memberData={memberData} />
		</main>
	)
}
