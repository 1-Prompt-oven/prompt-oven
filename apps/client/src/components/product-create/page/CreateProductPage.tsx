"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"
import PcSaveBar from "@/components/product-create/molecule/PcSaveBar.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"
import { PcTextarea } from "@/components/product-create/atom/PcTextarea.tsx"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import PcDescription from "@/components/product-create/atom/PcDescription.tsx"
import FieldLengthCounter from "@/components/product-create/atom/FieldLengthCounter.tsx"
import { PriceStepper } from "@/components/product-create/atom/PcPriceStepper.tsx"
import PcSelect from "@/components/product-create/atom/PcSelect.tsx"

function CreateProductPage() {
	// todo: API를 통해서 필요한 값들을 가져와야 합니다.
	const lastSaved = "Jul 3, 2022 at 3:54 PM"
	const [price, setPrice] = useState(1000)
	const { control } = useForm<FormValues>({
		defaultValues: {
			aiModel: "",
			modelType: "",
		},
	})
	return (
		<form className="flex flex-col gap-4">
			<AccountTitleText className="w-full">Create New Product</AccountTitleText>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="space-y-4">
					<PcTitle>Model Type</PcTitle>
					<Controller
						name="modelType"
						control={control}
						rules={{ required: "Theme is required" }}
						render={({ field }) => (
							<PcSelect
								options={modelTypeOptions}
								placeholder="Select Model Type"
								onValueChange={field.onChange}
								defaultValue={field.value}
							/>
						)}
					/>
				</div>
				<div className="space-y-4">
					<PcTitle>AI Model</PcTitle>
					<Controller
						name="aiModel"
						control={control}
						rules={{ required: "Theme is required" }}
						render={({ field }) => (
							<PcSelect
								options={imageGptModelOptions}
								placeholder="Select AI Model"
								onValueChange={field.onChange}
								defaultValue={field.value}
							/>
						)}
					/>
				</div>
			</div>

			<PcTitle className="mt-6">Name</PcTitle>
			<FieldLengthCounter maxLength={50} length={2}>
				<PcInput placeholder="Enter Name" />
			</FieldLengthCounter>

			<PcTitle className="mt-4">Prompt</PcTitle>
			<PcDescription>
				Enter your prompt text here. Include all the settings you used.
				<br />
				Put all variables in [square brackets].
			</PcDescription>
			<FieldLengthCounter maxLength={1000} length={5}>
				<PcTextarea placeholder="Enter your prompt text here. Include all the settings you used. Put all variables in [square brackets]." />
			</FieldLengthCounter>

			<PcTitle className="mt-4">Description</PcTitle>
			<FieldLengthCounter maxLength={1000} length={5}>
				<PcTextarea placeholder="Enter Description" />
			</FieldLengthCounter>

			<PcTitle>Price</PcTitle>
			<PriceStepper
				className="!mb-12 px-8"
				min={1000}
				max={5000}
				step={500}
				value={price}
				onChange={setPrice}
			/>

			<PcSaveBar lastSaved={lastSaved} />
		</form>
	)
}

export default CreateProductPage

interface FormValues {
	aiModel: string
	modelType: string
}
const modelTypeOptions = [
	{ value: "text", label: "Text", id: "1" },
	{ value: "image", label: "Image", id: "2" },
]

// const textGptModelOptions = [
// 	{ value: "ChatGPT", label: "ChatGPT", id: "1" },
// 	{ value: "Claude", label: "Claude", id: "2" },
// ]

const imageGptModelOptions = [
	{ value: "Midjourney", label: "Midjourney", id: "1" },
	{ value: "DALLE", label: "DALLE", id: "2" },
]

/*

 */
