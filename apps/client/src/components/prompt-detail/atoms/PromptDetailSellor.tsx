import { STATIC_DEFAULT_AVATAR } from "@/app/static/data"
import { getSellorShort } from "@/action/prompt-detail/getProductDetailData"
import PromptDetailLinkSellor from "./PromptDetailLinkSellor"
import PromptDetailSellorFollow from "./PromptDetailSellorFollow"

interface PromptDetailSellorProps {
	memberUuid: string
}

export default async function PromptDetailSellor({
	memberUuid,
}: PromptDetailSellorProps) {
	const sellorInfo = await getSellorShort(memberUuid)

	return (
		<div className="flex items-center justify-start gap-4">
			<PromptDetailLinkSellor
				memberNickname={sellorInfo.memberNickname}
				memberProfileImage={
					sellorInfo.memberProfileImage !== ""
						? sellorInfo.memberProfileImage
						: STATIC_DEFAULT_AVATAR
				}
			/>

			<PromptDetailSellorFollow />
		</div>
	)
}
