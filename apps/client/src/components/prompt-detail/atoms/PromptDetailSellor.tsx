import { STATIC_DEFAULT_AVATAR } from "@/app/static/data"
import type { ProfileDetailSellorShortType } from "@/types/prompt-detail/promptDetailType"
import PromptDetailLinkSellor from "./PromptDetailLinkSellor"
import PromptDetailSellorFollow from "./PromptDetailSellorFollow"

interface PromptDetailSellorProps {
	sellerData: ProfileDetailSellorShortType
	followState: boolean
}

export default async function PromptDetailSellor({
	sellerData,
	followState,
}: PromptDetailSellorProps) {
	return (
		<div className="flex items-center justify-start gap-4">
			<PromptDetailLinkSellor
				memberNickname={sellerData.memberNickname}
				memberProfileImage={
					sellerData.memberProfileImage !== ""
						? sellerData.memberProfileImage
						: STATIC_DEFAULT_AVATAR
				}
			/>

			<PromptDetailSellorFollow
				sellerData={sellerData}
				followState={followState}
			/>
		</div>
	)
}
