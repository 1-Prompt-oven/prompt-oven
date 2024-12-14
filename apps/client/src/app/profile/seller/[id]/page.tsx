import {
	getProfileList,
	getProfileMemberInfo,
} from "@/action/profile/getProfileData"
import ProfileSellorTemplate from "@/components/profile-sellor/templates/ProfileSellorTemplate"

export default async function SellorProfile({
	params,
}: {
	params: { id: string }
}) {
	const memberData = await getProfileMemberInfo(params.id)
	const listData = await getProfileList()

	return (
		<main className="container mx-auto bg-[#111111] py-1">
			<ProfileSellorTemplate memberData={memberData} listData={listData} />
		</main>
	)
}
