import React from "react"
import type { AccountSearchParams } from "@/types/account/searchParams.ts"
import CreateProductFirstPage from "@/components/product-create/page/CreateProductFirstPage.tsx"
import CreateProductSecondTextPage from "@/components/product-create/page/CreateProductSecondTextPage.tsx"
import CreateProductSecondImagePage from "@/components/product-create/page/CreateProductSecondImagePage.tsx"

function CreateProductPage({ searchParams }: AccountSearchParams) {
	const { llmType, step } = searchParams
	return (
		<>
			{(step === "1" || !step) && (
				<CreateProductFirstPage searchParams={searchParams} />
			)}
			{step === "2" && llmType === "text" && (
				<CreateProductSecondTextPage searchParams={searchParams} />
			)}
			{step === "1" && llmType === "image" && (
				<CreateProductSecondImagePage searchParams={searchParams} />
			)}
		</>
	)
}

export default CreateProductPage
