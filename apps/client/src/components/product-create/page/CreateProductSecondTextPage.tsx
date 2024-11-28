"use client"

import React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"
import {
	createProductSecondSchema,
	createProductSecondSchemaKeys,
} from "@/schema/product.ts"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import PcSelect from "@/components/product-create/atom/PcSelect.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"

// interface CreateProductSecondTextPageProps {}

// const testTextPrompt =
// 	"Please provide a prompt for [the AI model] to generate [the text]."

const modelVersion = [
	{ value: "1", label: "Chat GPT 3.5" },
	{ value: "2", label: "Chat GPT 4" },
	{ value: "3", label: "Chat GPT 4o" },
]

function CreateProductSecondTextPage() {
	const { control, register } = useForm({
		resolver: zodResolver(createProductSecondSchema),
		mode: "onChange",
		defaultValues: {
			contents: [],
			seed: "",
			llmVersionId: "",
		},
	})

	// const [prompt, setPrompt] = useState(testTextPrompt)
	// useEffect(() => {
	// 	console.log(JSON.stringify(extractPromptVariables(prompt)))
	// }, [prompt])

	return (
		<form className="flex flex-col gap-4">
			<AccountTitleText className="w-full">Create New Product</AccountTitleText>

			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="space-y-4">
					<PcTitle>Model Version</PcTitle>
					<Controller
						name={createProductSecondSchemaKeys.llmVersionId}
						control={control}
						rules={{ required: "Theme is required" }}
						render={({ field }) => (
							<PcSelect
								options={modelVersion}
								placeholder="Select AI Model"
								onValueChange={field.onChange}
								defaultValue={field.value}
							/>
						)}
					/>
				</div>

				<div className="space-y-4">
					<PcTitle>Subcategory</PcTitle>
					<PcInput
						placeholder="Enter Model Seed"
						type="number"
						{...register(createProductSecondSchemaKeys.seed)}
					/>
				</div>
			</div>
		</form>
	)
}

export default CreateProductSecondTextPage
