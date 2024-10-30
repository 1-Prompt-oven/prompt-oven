import React from "react"

interface FeatureDescriptionContainerProps {
	children: React.ReactNode
}

function FeatureDescriptionContainer({
	children,
}: FeatureDescriptionContainerProps) {
	return (
		<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
			{children}
		</div>
	)
}

export default FeatureDescriptionContainer
