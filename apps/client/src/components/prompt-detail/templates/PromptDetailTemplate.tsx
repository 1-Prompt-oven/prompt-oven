// import type {
// 	DetailCategoryListType,
// 	DetailDropsCarouselType,
// } from "@/types/prompt-detail/associationPromptType"
import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import type { PromptReviewType } from "@/types/review/reviewType"
import type { CookieLatestType } from "@/types/cookie/cookieResponseType"
import PromptDetailMain from "../organisms/PromptDetailMain"
import PromptDetailReview from "../organisms/PromptDetailReview"

interface PromptDetailProps {
	// notableDrops: DetailDropsCarouselType[]
	// categories: DetailCategoryListType[]
	userCookie: CookieLatestType
	purchaseState: boolean
	productDetail: PromptDetailInfoType
	productReview: PromptReviewType
}

export default function PromptDetailTemplate({
	userCookie,
	purchaseState,
	productDetail,
	productReview,
}: PromptDetailProps) {
	return (
		<section className="mx-4 mt-12 flex max-w-screen-xl flex-col xs:mx-auto lg:gap-16">
			<PromptDetailMain
				contents={productDetail.contents}
				productDetail={productDetail}
				userCookie={userCookie}
				purchaseState={purchaseState}
			/>

			<PromptDetailReview
				productDetail={productDetail}
				productReview={productReview}
				purchaseState={purchaseState}
			/>
		</section>
	)
}
