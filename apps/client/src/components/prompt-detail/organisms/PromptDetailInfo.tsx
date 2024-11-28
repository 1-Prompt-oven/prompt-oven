import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import PromptDetailHash from "../molecules/PromptDetailHash"
import PromptDetailProductDescription from "../molecules/PromptDetailProductDescription"
import PromptDetailSellor from "../molecules/PromptDetailSellor"
import PromptDetailStandardInfo from "../molecules/PromptDetailStandardInfo"
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
					createdAt={productDetail.createdAt}
					price={productDetail.price}
					productName={productDetail.productName}
					avgStar={productDetail.avgStar}
					productReviewCount={productDetail.productReviewCount}
				/>

				<PromptDetailHash
					hashTag={productDetail.hashTag}
					bio={productDetail.bio}
				/>

				<PromptDetailSellor
					memberNickname={productDetail.memberNickname}
					memberProfileImage={productDetail.memberProfileImage}
				/>

				<PromptDetailProductDescription
					productDescription={productDetail.productDescription}
				/>
			</div>

			<PromptDetailChoice
				isFavorite={productDetail.isFavorite}
				isCart={productDetail.isCart}
			/>
		</div>
	)
}
