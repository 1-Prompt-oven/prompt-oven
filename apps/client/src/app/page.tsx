import MainHeader from "@/components/main/molecule/MainHeader.tsx"
import FeatureDescription from "@/components/main/atom/FeatureDescription.tsx"
import AccountSvg from "@/components/main/atom/icon/AccountSvg.tsx"
import AddFolderSvg from "@/components/main/atom/icon/AddFolderSvg.tsx"
import AddPromptSvg from "@/components/main/atom/icon/AddPromptSvg.tsx"
import SaleSvg from "@/components/main/atom/icon/SaleSvg.tsx"
import FeatureDescriptionContainer from "@/components/main/atom/FeatureDescriptionContainer.tsx"
import ImageCarousel from "@/components/main/molecule/ImageCarousel.tsx"
import CategoryList from "@/components/main/molecule/CategoryList.tsx"
import NotableDrop from "@/components/main/molecule/NotableDrop.tsx"
import MainFooter from "@/components/main/organism/MainFooter.tsx"


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
  }
]

const promptCategories = [
	{
		title: "3D Art",
		images: ["/img/main/art1.png", "/img/main/art2.png", "/img/main/art3.png"],
	},
	{
		title: "Digital Painting",
		images: [
			"/img/main/collectibles1.png",
			"/img/main/collectibles2.png",
			"/img/main/collectibles3.png",
		],
	},
	{
		title: "Stylized Art",
		images: ["/img/main/art1.png", "/img/main/art2.png", "/img/main/art3.png"],
	},
	{
		title: "Realistic Art",
		images: ["/img/main/art1.png", "/img/main/art2.png", "/img/main/art3.png"],
	},
	{
		title: "Music",
		images: ["/img/main/art1.png", "/img/main/art2.png", "/img/main/art3.png"],
	},
	{
		title: "Photography",
		images: ["/img/main/art1.png", "/img/main/art2.png", "/img/main/art3.png"],

	},
]



export default function Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between bg-[#111111]">
			<MainHeader />
      
			<div className="flex w-full flex-col items-center justify-center gap-20 p-8">
        
				<ImageCarousel />
        
        <div className="flex h-[1000px] w-full items-center justify-center p-8">
				  <div>
					  <FeatureDescriptionContainer>
						  {steps.map((step, index) => (
							  <FeatureDescription
								  key={index}
								  icon={step.icon}
								  title={step.title}
								  description={step.description}
							  />
						  ))}
					  </FeatureDescriptionContainer>
				  </div>
			  </div>
        
				<div className="py-10">
					<CategoryList categories={promptCategories} />
				</div>
        
				<div className="py-10">
					<NotableDrop
						tag="NEW"
						bgImage="/img/main/notableDrop1.png"
						title="Colourfull assests"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
						author={{
							name: "@robix2x2x",
							profile: "/img/main/notableDropAvatar1.png",
						}}
					/>
				</div>
        
			</div>
      
			<MainFooter />
		</main>
	)
}
