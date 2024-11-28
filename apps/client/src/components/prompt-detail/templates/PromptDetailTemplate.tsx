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
		<section className="mx-auto mt-12 flex max-w-screen-xl flex-col lg:gap-16">
			<PromptDetailMain
				thumbnailUrl={productDetail.thumbnailUrl}
				productUuid={productDetail.productUuid}
				productDetail={productDetail}
			/>

			<PromptDetailReview
				reviewCount={productReview.content.length}
				productDetail={productDetail}
				productReview={productReview}
			/>

			<PromptDetailDropsCarousel items={notableDrops} />
			<PropmtDetailCategoryList categories={categories} />
		</section>
	)
}
