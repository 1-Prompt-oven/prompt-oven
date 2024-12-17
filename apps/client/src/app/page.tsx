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

const notableDrops = Array.from({ length: 12 }).map(() => ({
	title: "Colourfull assests",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
	tag: "NEW",
	bgImage: "/img/main/notableDrop1.png",
	author: {
		name: "@robix2x2x",
		profile: "/img/main/notableDropAvatar1.png",
	},
}))

const sellers = [
	{ number: 1, nickname: "Creator 1", earnings: 6486658, isVerified: true },
	{ number: 2, nickname: "Creator 2", earnings: 10140240, isVerified: true },
	{ number: 3, nickname: "Creator 3", earnings: 2156628, isVerified: true },
	{ number: 4, nickname: "Creator 4", earnings: 1168853, isVerified: false },
	{ number: 5, nickname: "Creator 5", earnings: 839349, isVerified: true },
	{ number: 6, nickname: "Creator 6", earnings: 3986580, isVerified: false },
	{ number: 7, nickname: "Creator 7", earnings: 2170691, isVerified: false },
	{ number: 8, nickname: "Creator 8", earnings: 1643063, isVerified: true },
	{ number: 9, nickname: "Creator 9", earnings: 14685149, isVerified: true },
	{ number: 10, nickname: "Creator 10", earnings: 10510827, isVerified: true },
	{ number: 11, nickname: "Creator 11", earnings: 6561810, isVerified: true },
	{ number: 12, nickname: "Creator 12", earnings: 6486658, isVerified: true },
	{ number: 13, nickname: "Creator 13", earnings: 15432752, isVerified: false },
	{ number: 14, nickname: "Creator 14", earnings: 8443547, isVerified: true },
	{ number: 15, nickname: "Creator 15", earnings: 16143658, isVerified: true },
]

const images = [
	{
		src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14d64d25a42a191fc83ed8fe0131d55e-elpi9POXTCICMSLKPSWwoBsGyvbQOw.png",
		alt: "Cute cartoon character in bear costume with smaller bear",
		title: "Bear Friends",
		creator: "@bearartist",
		mainDesc: "1 - Eva Sheppard | AI https://t.me/neirolapki",
		subDesc:
			"1 - Ai Prompts Для заказов и сотрудничества ⬇️ @Eva_Sheppard ⚡Промты для нейросетей⚡ #Midjourney prompts. #Шедеврум промты. Stable Diffusion. Канал для вдохновения 💜 #Midjourney ⬇️ http://clck.ru/3BCUnQ",
	},
	{
		src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1a6d4c50df289b2a6a9a07124702274-4jydo2FU8fWjY5BCng03SGBGMSasEi.png",
		alt: "Close-up of cartoon character in bear costume",
		title: "크양",
		creator: "@koreanartist",
		mainDesc: "2 - Eva Sheppard | AI https://t.me/neirolapki",
		subDesc:
			"2 - Ai Prompts Для заказов и сотрудничества ⬇️ @Eva_Sheppard ⚡Промты для нейросетей⚡ #Midjourney prompts. #Шедеврум промты. Stable Diffusion. Канал для вдохновения 💜 #Midjourney ⬇️ http://clck.ru/3BCUnQ",
	},
	{
		src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a94f15e50a0469c3be2ddb4899f7c942-1QwjkrzSSCeKm5ZacaXZQReGQfNgiS.png",
		alt: "Anime girl with pink hair taking selfie in magical room",
		title: "Magical Selfie",
		creator: "@animeartist",
		mainDesc: "3 - Eva Sheppard | AI https://t.me/neirolapki",
		subDesc:
			"3 - Ai Prompts Для заказов и сотрудничества ⬇️ @Eva_Sheppard ⚡Промты для нейросетей⚡ #Midjourney prompts. #Шедеврум промты. Stable Diffusion. Канал для вдохновения 💜 #Midjourney ⬇️ http://clck.ru/3BCUnQ",
	},
	{
		src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%92%E1%85%A9%E1%84%80%E1%85%AE%E1%84%8B%E1%85%AA%E1%84%90%E1%85%B3-%E1%84%8E%E1%85%A1%E1%86%B8-cZ48jAqFyuoVQcABL0KztIIBFgS4yi.png",
		alt: "Anime girl with pink hair by window on train",
		title: "Magical Journey",
		creator: "@abstractart",
		mainDesc: "4 - Eva Sheppard | AI https://t.me/neirolapki",
		subDesc:
			"4 - Ai Prompts Для заказов и сотрудничества ⬇️ @Eva_Sheppard ⚡Промты для нейросетей⚡ #Midjourney prompts. #Шедеврум промты. Stable Diffusion. Канал для вдохновения 💜 #Midjourney ⬇️ http://clck.ru/3BCUnQ",
	},
]

export default function Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between bg-[#111111]">
			<PromptImageCarousel images={images} />

			<div className="w-full py-32">
				<NotableDropsCarousel items={notableDrops} />
			</div>

			<div className="w-full">
				<BestSellerFilter sellers={sellers} />
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
