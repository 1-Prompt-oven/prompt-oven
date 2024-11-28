"use client"

import React from "react"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"

// interface CreateProductSecondTextPageProps {}

function CreateProductSecondTextPage() {
	// const { control, register, watch } = useForm({
	// 	resolver: zodResolver(createProductSecondSchema),
	// 	mode: "onChange",
	// 	defaultValues: {
	// 		llmId: "",
	// 		productName: "",
	// 		topCategoryUuid: "",
	// 		subCategoryUuid: "",
	// 		prompt: "",
	// 		description: "",
	// 		price: 1000,
	// 		discountRate: 0,
	// 	},
	// })

	return (
		<form className="flex flex-col gap-4">
			<AccountTitleText className="w-full">Create New Product</AccountTitleText>
		</form>
	)
}

export default CreateProductSecondTextPage
