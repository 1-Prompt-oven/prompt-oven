import type { ProductListSearchParams } from "@/types/account/searchParams"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import ProfileSellorInfo from "../organisms/ProfileSellorInfo"
import SellerList from "../organisms/SellorList"

interface ProfileDataProps {
	memberData: ProfileMemberInfoType
	searchParams: ProductListSearchParams
	sellerName: string
	sellerUuid: string
}

export default async function ProfileSellerTemplate({
	memberData,
	searchParams,
	sellerName,
	sellerUuid,
}: ProfileDataProps) {
	return (
		<section className="mx-auto mt-24 max-w-screen-xl">
			<ProfileSellorInfo memberData={memberData} />
			<SellerList
				searchParams={searchParams}
				sellerName={sellerName}
				sellerUuid={sellerUuid}
			/>
		</section>
	)
}
