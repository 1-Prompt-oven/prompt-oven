import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import PromptDetailDescription from "../atoms/PromptDetailHash"
import PromptDetailStandardInfo from "../atoms/PromptDetailStandardInfo"
import PromptDetailContents from "../molecules/PromptDetailContents"
import PromptDetailChoice from "../molecules/PromptDetailChoice"

interface PromptDetailInfoProps {
	productDetail: PromptDetailInfoType
}

export default function PromptDetailInfo({
	productDetail,
}: PromptDetailInfoProps) {
	return (
		<div className="flex min-h-[600px] flex-grow flex-col sm:min-h-[800px] lg:justify-between">
			<div className="flex flex-col gap-12">
				<PromptDetailStandardInfo
					productRegistDate={productDetail.updatedAt}
					price={productDetail.price}
					productName={productDetail.productName}
					productStar={productDetail.avgStar}
					reviewCount={productDetail.reviewCount}
				/>

				<PromptDetailDescription
					llmid={productDetail.llmId}
					description={productDetail.description}
				/>

				{/* <PromptDetailSellor memberUuid={contents.sellerUuid} /> */}

				<PromptDetailContents productContents={productDetail.contents} />
			</div>

			<PromptDetailChoice productUuid={productDetail.productUuid} />
		</div>
	)
}
