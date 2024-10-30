import React from "react"

interface FeatureDescriptionProps {
	title: string
	description: string
	icon: React.ReactNode
}

function FeatureDescription({
	title,
	description,
	icon,
}: FeatureDescriptionProps) {
	return (
		<div className="flex flex-col items-start text-white">
			<div className="mb-[30px] flex items-center justify-center">{icon}</div>
			<h2 className="mb-[10px] text-[21px] font-semibold leading-[29px]">
				{title}
			</h2>
			<p className="text-[17px] leading-[24px] text-gray-400">{description}</p>
		</div>
	)
}

export default FeatureDescription
