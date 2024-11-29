"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"
import PcSaveBar from "@/components/product-create/molecule/PcSaveBar.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"
import { PcTextarea } from "@/components/product-create/atom/PcTextarea.tsx"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import PcDescription from "@/components/product-create/atom/PcDescription.tsx"
import FieldLengthCounter from "@/components/product-create/atom/FieldLengthCounter.tsx"
import { PriceStepper } from "@/components/product-create/atom/PcPriceStepper.tsx"
import PcSelect from "@/components/product-create/atom/PcSelect.tsx"
import {
	createProductFirstSchema,
	createProductFirstSchemaKeys,
} from "@/schema/product.ts"
import PcBaseWrapper from "@/components/product-create/atom/PcBaseWrapper.tsx"

const TITLE_MAX_LENGTH = 50
const TEXTAREA_MAX_LENGTH = 4096

const aiModelOptions = [
	{ value: "1", label: "ChatGPT" },
	{ value: "2", label: "DALLE" },
]

export default function CreateProductFirstPage() {
	const { control, register, watch } = useForm({
		resolver: zodResolver(createProductFirstSchema),
		mode: "onChange",
		defaultValues: {
			llmId: "",
			productName: "",
			topCategoryUuid: "",
			subCategoryUuid: "",
			prompt: "",
			description: "",
			price: 1000,
			discountRate: 0,
		},
	})

	// watch values
	const productNameWatch = watch(
		createProductFirstSchemaKeys.productName,
	).length
	const promptWatch = watch(createProductFirstSchemaKeys.prompt).length
	const descriptionWatch = watch(
		createProductFirstSchemaKeys.description,
	).length

	// todo: API를 통해서 필요한 값들을 가져와야 합니다.
	const lastSaved = "Jul 3, 2022 at 3:54 PM"

	return (
		<form className="flex flex-col gap-4">
			<AccountTitleText className="w-full">Create New Product</AccountTitleText>

			<PcBaseWrapper className="mt-6">
				<PcTitle>AI Model</PcTitle>
				<Controller
					name={createProductFirstSchemaKeys.llmId}
					control={control}
					rules={{ required: "Theme is required" }}
					render={({ field }) => (
						<PcSelect
							className="w-80"
							options={aiModelOptions}
							placeholder="Select AI Model"
							onValueChange={field.onChange}
							defaultValue={field.value}
						/>
					)}
				/>
			</PcBaseWrapper>

			<PcBaseWrapper className="mt-6">
				<PcTitle className="">Name</PcTitle>
				<FieldLengthCounter
					maxLength={TITLE_MAX_LENGTH}
					length={productNameWatch}>
					<PcInput
						placeholder="Enter Name"
						maxLength={TITLE_MAX_LENGTH}
						{...register(createProductFirstSchemaKeys.productName)}
					/>
				</FieldLengthCounter>
			</PcBaseWrapper>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<PcBaseWrapper>
					<PcTitle>Category</PcTitle>
					<Controller
						name={createProductFirstSchemaKeys.topCategoryUuid}
						control={control}
						rules={{ required: "Theme is required" }}
						render={({ field }) => (
							<PcSelect
								options={aiModelOptions}
								placeholder="Select AI Model"
								onValueChange={field.onChange}
								defaultValue={field.value}
							/>
						)}
					/>
				</PcBaseWrapper>
				<PcBaseWrapper>
					<PcTitle>Subcategory</PcTitle>
					<Controller
						name={createProductFirstSchemaKeys.subCategoryUuid}
						control={control}
						rules={{ required: "Theme is required" }}
						render={({ field }) => (
							<PcSelect
								options={aiModelOptions}
								placeholder="Select AI Model"
								onValueChange={field.onChange}
								defaultValue={field.value}
							/>
						)}
					/>
				</PcBaseWrapper>
			</div>

			<PcBaseWrapper className="mt-6">
				<PcTitle>Prompt</PcTitle>
				<PcDescription>
					Enter your prompt text here. Include all the settings you used.
					<br />
					Put all variables in [square brackets].
				</PcDescription>
				<FieldLengthCounter
					maxLength={TEXTAREA_MAX_LENGTH}
					length={promptWatch}>
					<PcTextarea
						maxLength={TEXTAREA_MAX_LENGTH}
						placeholder="Enter your prompt text here. Include all the settings you used. Put all variables in [square brackets]."
						{...register(createProductFirstSchemaKeys.prompt)}
					/>
				</FieldLengthCounter>
			</PcBaseWrapper>

			<PcBaseWrapper className="mt-4">
				<PcTitle>Description</PcTitle>
				<FieldLengthCounter
					maxLength={TEXTAREA_MAX_LENGTH}
					length={descriptionWatch}>
					<PcTextarea
						maxLength={TEXTAREA_MAX_LENGTH}
						placeholder="Enter Description"
						{...register(createProductFirstSchemaKeys.description)}
					/>
				</FieldLengthCounter>
			</PcBaseWrapper>

			<PcBaseWrapper>
				<PcTitle>Price</PcTitle>
				<Controller
					name={createProductFirstSchemaKeys.price}
					control={control}
					render={({ field }) => (
						<PriceStepper
							className="!mb-12 px-8"
							min={1000}
							max={5000}
							step={500}
							value={field.value}
							onChange={(value) => {
								field.onChange(value)
							}}
						/>
					)}
				/>
			</PcBaseWrapper>

			<PcSaveBar lastSaved={lastSaved} />
		</form>
	)
}
