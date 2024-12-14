import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import type { PromptItemType } from "@/types/prompts/promptsType"
import ProfileSellorInfo from "../organisms/ProfileSellorInfo"
import ProfilePrompt from "../organisms/ProfilePrompt"

interface ProfileDataProps {
	memberData: ProfileMemberInfoType // 회원 정보
	listData: PromptItemType[]
	// listData: {
	// 	items: PromptsType[] // 프로필 카드 목록
	// 	nextCursor: string | null // 다음 커서
	// }
}

export default async function ProfileSellorTemplate({
	memberData,
	listData,
}: ProfileDataProps) {
	const handleFilter = async (filterFormData: FormData) => {
		"use server"

		const payload = {
			searchBar: filterFormData.get("searchBar") as string | undefined,
			topCategoryUuid: filterFormData.get("topCategoryUuid") as
				| string
				| undefined,
			subCategoryUuid: filterFormData.get("subCategoryUuid") as
				| string
				| undefined,
			enable: filterFormData.get("enable") === "on",
			minPrice: filterFormData.get("minPrice") as string | undefined,
			maxPrice: filterFormData.get("maxPrice") as string | undefined,
			sortDate: filterFormData.get("sortDate") as string | undefined,
			sortOption: filterFormData.get("sortOption") as string | undefined,
		}

		// eslint-disable-next-line no-console -- Sidebar Filter test Console
		console.log(payload)
	}

	return (
		<section className="mx-auto mt-24 max-w-screen-xl">
			<ProfileSellorInfo memberData={memberData} />
			<ProfilePrompt listData={listData} handleFilter={handleFilter} />
		</section>
	)
}
