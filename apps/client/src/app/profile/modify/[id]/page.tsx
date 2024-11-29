import { getProfileMemberInfo } from "@/action/profile/getProfileData"
import ProfileModifyTemplate from "@/components/profile-modify/templates/ProfileModifyTemplate"

export default async function ProfileModify({
	params,
}: {
	params: { id: string }
}) {
	const memberData = await getProfileMemberInfo(params.id)

	return (
		<main className="container mx-auto bg-[#111111] py-1">
			<ProfileModifyTemplate memberData={memberData} />
		</main>
	)
}
