import { getProfileMemberInfo } from "@/action/profile/getProfileData"
import ProfileModifyTemplate from "@/components/profile-modify/templates/ProfileModifyTemplate"
import { redirect } from "next/navigation"
import { matchUser } from "@/lib/api/sessionExtractor"

export default async function ProfileModify({
	params,
}: {
	params: { id: string }
}) {
	const memberData = await getProfileMemberInfo(params.id)

	const isMatchUser = await matchUser(memberData.memberUUID)
	if (!isMatchUser) {
		redirect("/error")
	}

	return (
		<main className="container mx-auto bg-[#111111] py-1">
			<ProfileModifyTemplate memberData={memberData} />
		</main>
	)
}
