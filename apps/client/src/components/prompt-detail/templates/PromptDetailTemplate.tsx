import type {
	DetailCategoryListType,
	DetailDropsCarouselType,
} from "@/types/prompt-detail/associationPromptType"
import type { PromptDetailInfoType } from "@/types/prompt-detail/promptDetailType"
import type { PromptReviewType } from "@/types/review/reviewType"
import PromptDetailMain from "../organisms/PromptDetailMain"
import PromptDetailDropsCarousel from "../organisms/PromptDetailDropsCarousel"
import PromptDetailReview from "../organisms/PromptDetailReview"
import PropmtDetailCategoryList from "../molecules/PropmtDetailCategoryList"

interface PromptDetailProps {
	notableDrops: DetailDropsCarouselType[]
	categories: DetailCategoryListType[]
	productDetail: PromptDetailInfoType
	productReview: PromptReviewType
}

export default function PromptDetailTemplate({
	notableDrops,
	categories,
	productDetail,
	productReview,
}: PromptDetailProps) {
	return (
		<section className="mx-4 mt-12 flex max-w-screen-xl flex-col xs:mx-auto lg:gap-16">
			<PromptDetailMain
				contents={productDetail.contents}
				productDetail={productDetail}
			/>

			<PromptDetailReview
				productDetail={productDetail}
				productReview={productReview}
			/>

			<PromptDetailDropsCarousel items={notableDrops} />
			<PropmtDetailCategoryList categories={categories} />
		</section>
	)
}
