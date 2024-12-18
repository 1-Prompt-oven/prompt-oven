import React from "react"
import FooterLogo from "@/components/common/atom/icon/FooterLogo.tsx"

function MainFooter() {
	return (
		<footer className="box-border w-full border-t-[1px] border-[#424242] bg-[#111111] pt-16 text-white">
			{/* Footer content */}
			<div className="container mx-auto px-4">
				{/*<div className="mb-16">*/}
				{/*	<div className="gap-20 xl:flex xl:justify-between">*/}
				{/*		<div className="mb-8 xl:mb-0 xl:w-[670px]">*/}
				{/*			<h3 className="mb-4 text-2xl font-semibold">Stay in the loop</h3>*/}
				{/*			<div className="flex">*/}
				{/*				<EmailInput />*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*		<div className="xl:w-[670px]">*/}
				{/*			<h3 className="mb-4 text-2xl font-semibold">*/}
				{/*				Join the community*/}
				{/*			</h3>*/}
				{/*			<IconLinkContainer />*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}

				{/* Footer links */}
				<div className="flex flex-col gap-8 lg:!flex-row">
					<div className="space-y-4 lg:w-1/4">
						<FooterLogo />
						<p className="text-sm text-gray-400">
							Prompt Oven is the premier marketplace for AI enthusiasts to buy,
							sell, and discover high-quality prompts. Empower your AI projects
							with expertly crafted prompts or monetize your prompt engineering
							skills.
						</p>
					</div>

					{/*<div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:w-3/4">*/}
					{/*	{["My account", "Resources", "Company"].map((title, index) => (*/}
					{/*		// eslint-disable-next-line react/no-array-index-key -- index is unique*/}
					{/*		<div key={index}>*/}
					{/*			<h3 className="mb-4 mt-9 text-lg font-semibold">{title}</h3>*/}
					{/*			<ul className="space-y-2">*/}
					{/*				{[*/}
					{/*					"Profile",*/}
					{/*					"Help center",*/}
					{/*					"About",*/}
					{/*					"My Collections",*/}
					{/*					"Partners",*/}
					{/*					"Careers",*/}
					{/*					"Create item",*/}
					{/*					"Activity",*/}
					{/*					"Blog",*/}
					{/*					"Settings",*/}
					{/*					"Rankings",*/}
					{/*					"Contact us",*/}
					{/*				]*/}
					{/*					.slice(index * 4, (index + 1) * 4)*/}
					{/*					.map((item, i) => (*/}
					{/*						// eslint-disable-next-line react/no-array-index-key -- index is unique*/}
					{/*						<li key={i}>*/}
					{/*							<NavLink*/}
					{/*								href="#"*/}
					{/*								className="text-sm"*/}
					{/*								activeColor="#FCB808"*/}
					{/*								color="#FFFFFF">*/}
					{/*								{item}*/}
					{/*							</NavLink>*/}
					{/*						</li>*/}
					{/*					))}*/}
					{/*			</ul>*/}
					{/*		</div>*/}
					{/*	))}*/}
					{/*</div>*/}
				</div>

				{/* bottom of footer */}
				<div className="mt-16 flex flex-col items-center justify-between border-t border-gray-800 py-[25px] md:!flex-row">
					<p className="text-sm text-gray-400">
						chikchok © 2024 prompt oven. All rights reserved.
					</p>
					{/*<p className="mt-1 text-sm text-gray-400 md:mt-0">*/}
					{/*	<Link href="#" className="hover:text-white">*/}
					{/*		Privacy policy*/}
					{/*	</Link>{" "}*/}
					{/*	|{" "}*/}
					{/*	<Link href="#" className="hover:text-white">*/}
					{/*		Terms of service*/}
					{/*	</Link>*/}
					{/*</p>*/}
				</div>
			</div>
		</footer>
	)
}

export default MainFooter
