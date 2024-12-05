import React from "react"
import type { Session } from "next-auth"
import type { AccountQueryParams } from "@/types/account/searchParams.ts"
import CreateProductFirstPage from "@/components/product-create/page/CreateProductFirstPage.tsx"
import CreateProductSecondImagePage from "@/components/product-create/page/CreateProductSecondImagePage.tsx"
import CreateProductSecondTextPage from "@/components/product-create/page/CreateProductSecondTextPage.tsx"
import CreateSuccessPage from "@/components/product-create/page/CreateSuccessPage.tsx"

export interface CreateProductPageProps {
	searchParams: AccountQueryParams
	session: Session | null
}

function CreateProductPage({ searchParams, session }: CreateProductPageProps) {
	const { llmType, step } = searchParams
	return (
		<>
			{(step === "1" || !step) && (
				<CreateProductFirstPage session={session} searchParams={searchParams} />
			)}
			{step === "2" && llmType === "text" && (
				<CreateProductSecondTextPage
					session={session}
					searchParams={searchParams}
				/>
			)}
			{step === "2" && llmType === "image" && (
				<CreateProductSecondImagePage
					session={session}
					searchParams={searchParams}
				/>
			)}
			{step === "3" && <CreateSuccessPage searchParams={searchParams} />}
		</>
	)
}

export default CreateProductPage
