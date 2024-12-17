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
			"Malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Proin libero nunc consequat interdum.",
	},
	{
		icon: <AddFolderSvg />,
		title: "Create your collection",
		description:
			"Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Risus nullam eget felis eget nunc lobortis.",
	},
	{
		icon: <AddPromptSvg />,
		title: "Add your PROMPT",
		description:
			"Volutpat commodo sed egestas egestas. Mollis aliquam ut porttitor leo a diam sollicitudin tempor.",
	},
	{
		icon: <SaleSvg />,
		title: "List them for sale",
		description:
			"Diam sit amet nisl suscipit adipiscing bibendum est. Porttitor eget dolor morbi non arcu risus quis varius quam.",
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
				<div className="relative mb-[100px] mt-[120px] flex w-full items-center justify-center overflow-hidden">
					<span className="inline-block whitespace-nowrap bg-gradient-to-r from-[#A913F9] to-[#FC466B] bg-clip-text font-sora text-[200px] font-semibold uppercase leading-[90%] tracking-tight text-transparent">
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
