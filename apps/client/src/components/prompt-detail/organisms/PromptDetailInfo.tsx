import { getSellorShort } from "@/action/prompt-detail/getProductDetailData"
import { getFollowingState } from "@/action/prompt-detail/getProductDetailFollowData"
import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import PromptDetailDescription from "../atoms/PromptDetailHash"
import PromptDetailStandardInfo from "../atoms/PromptDetailStandardInfo"
import PromptDetailContents from "../molecules/PromptDetailContents"
import PromptDetailChoice from "../molecules/PromptDetailChoice"
import PromptDetailSellor from "../atoms/PromptDetailSellor"

interface PromptDetailInfoProps {
	productDetail: PromptDetailInfoType
}

export default async function PromptDetailInfo({
	productDetail,
}: PromptDetailInfoProps) {
	const sellerData = await getSellorShort(productDetail.sellerUuid)
	const followState = await getFollowingState(sellerData.memberNickname)

	return (
		<div className="flex flex-col gap-12 lg:justify-between">
			<PromptDetailStandardInfo
				productUUID={productDetail.productUuid}
				productRegistDate={productDetail.updatedAt}
				price={productDetail.price}
				productName={productDetail.productName}
			/>

			<PromptDetailDescription
				llmid={productDetail.llmId}
				description={productDetail.description}
			/>

			<PromptDetailSellor sellerData={sellerData} followState={followState} />

			<PromptDetailContents productContents={productDetail.contents} />

			<PromptDetailChoice productUuid={productDetail.productUuid} />
		</div>
	)
}
