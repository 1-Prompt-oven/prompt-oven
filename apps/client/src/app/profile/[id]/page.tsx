import { getProfileMemberInfo } from "@/action/profile/getProfileData"
import ProfileTemplate from "@/components/profile/templates/ProfileTemplate"

export default async function Profile({ params }: { params: { id: string } }) {
	const memberData = await getProfileMemberInfo(params.id)

	return (
		<main className="container mx-auto bg-[#111111] py-1">
			<ProfileTemplate memberData={memberData} />
		</main>
	)
}

