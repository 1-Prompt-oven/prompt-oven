import { getProfileMemberInfo } from "@/action/profile/getProfileData"
import { getFollowingState } from "@/action/prompt-detail/getProductDetailFollowData"
import ProfileSellerTemplate from "@/components/profile-seller/templates/ProfileSellerTemplate"
import type { ProductListSearchParams } from "@/types/account/searchParams"

export default async function SellerProfile({
	params,
	searchParams,
}: {
	params: { id: string }
	searchParams: ProductListSearchParams
}) {
	const sellerData = await getProfileMemberInfo(params.id)
	const sellerUuid = sellerData.memberUUID
	const followState = await getFollowingState(sellerData.nickname)

	return (
		<main className="container mx-auto max-w-screen-xl bg-[#111111] py-1">
			<ProfileSellerTemplate
				memberData={sellerData}
				searchParams={searchParams}
				sellerName={sellerData.nickname}
				sellerUuid={sellerUuid}
				followState={followState}
			/>
		</main>
	)
}
