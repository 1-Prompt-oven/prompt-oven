import FeatureDescription from "@/components/main/atom/FeatureDescription.tsx"
import AccountSvg from "@/components/main/atom/icon/AccountSvg.tsx"
import AddFolderSvg from "@/components/main/atom/icon/AddFolderSvg.tsx"
import AddPromptSvg from "@/components/main/atom/icon/AddPromptSvg.tsx"
import SaleSvg from "@/components/main/atom/icon/SaleSvg.tsx"
import FeatureDescriptionContainer from "@/components/main/atom/FeatureDescriptionContainer.tsx"
import NotableDropsCarousel from "@/components/main/organism/NotableDropsCarousel.tsx"
import MainFooter from "@/components/main/organism/MainFooter.tsx"
import BestSellerFilter from "@/components/main/organism/BestSellerFilter.tsx"
import PromptImageCarousel from "@/components/main/organism/PromptImageCarousel.tsx"
import type { BestCreatorCursorListTypes2 } from "@/types/best/bestTypes.ts"
import { fetchRankingList } from "@/action/best/getBestData.ts"
import {
	getMainProductList,
	getNotableProductList,
} from "@/action/product/productAction.ts"

const steps = [
	{
		icon: <AccountSvg />,
		title: "Set up your Account",
		description:
			"Create your unique profile on Prompt Oven. Customize your bio, showcase your expertise, and connect with a community of AI enthusiasts and prompt engineers.",
	},
	{
		icon: <AddFolderSvg />,
		title: "Create your collection",
		description:
			"Organize your prompts into themed collections. Whether it's for storytelling, coding, or art generation, curate your best work to attract potential buyers.",
	},
	{
		icon: <AddPromptSvg />,
		title: "Add your PROMPT",
		description:
			"Upload your carefully crafted AI prompts. Add tags, categories, and detailed descriptions to help buyers find and understand your unique creations.",
	},
	{
		icon: <SaleSvg />,
		title: "List them for sale",
		description:
			"Set competitive prices for your prompts. Leverage our platform's tools to analyze market trends, optimize your listings, and maximize your earnings.",
	},
]

interface FetchBestCreatorsParams {
	lastRanking?: number
	pageSize?: number
	date: string
}

export default async function Page() {
	// bestSeller vars and functions
	const now = new Date()
	const todayDate = now.toISOString().split("T")[0]
	const params: FetchBestCreatorsParams = {
		date: todayDate,
		pageSize: 15,
		lastRanking: 0,
	}
	const bestData: BestCreatorCursorListTypes2 = await fetchRankingList(params)

	// notableDrops vars and functions
	const notableData = await getNotableProductList()
	const mainCarouselData = await getMainProductList()

	return (
		<main className="flex min-h-screen flex-col items-center justify-between bg-[#111111]">
			<PromptImageCarousel items={mainCarouselData} />

			<div className="w-full py-32">
				<NotableDropsCarousel items={notableData} />
			</div>

			<div className="w-full">
				<BestSellerFilter sellers={bestData.content} />
			</div>

			<div className="mb-20 flex w-full flex-col items-center justify-center">
				<div className="relative my-12 flex w-full items-center justify-center overflow-hidden sm:my-16 md:my-20 lg:mb-[100px] lg:mt-[120px]">
					<span className="inline-block whitespace-nowrap bg-gradient-to-r from-[#A913F9] to-[#FC466B] bg-clip-text px-4 font-sora text-4xl font-semibold uppercase leading-[90%] tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-[200px]">
						CREATE & SELL YOU
					</span>
				</div>

				<div className="max-w-[1420px] px-4">
					<FeatureDescriptionContainer>
						{steps.map((step, index) => (
							<FeatureDescription
								// eslint-disable-next-line react/no-array-index-key -- index is unique
								key={index}
								icon={step.icon}
								title={step.title}
								description={step.description}
							/>
						))}
					</FeatureDescriptionContainer>
				</div>
			</div>

			<MainFooter />
		</main>
	)
}
