import React from "react"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"

function CreateProductPage() {
	return (
		<div className="space-y-4">
			<PcTitle>Name and Prompt</PcTitle>
			<PcInput placeholder="test Pc input" />
		</div>
	)
}

export default CreateProductPage
