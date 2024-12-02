"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"
import PcSaveBar from "@/components/product-create/molecule/PcSaveBar.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"
import { PcTextarea } from "@/components/product-create/atom/PcTextarea.tsx"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import PcDescription from "@/components/product-create/atom/PcDescription.tsx"
import FieldLengthCounter from "@/components/product-create/atom/FieldLengthCounter.tsx"
import { PriceStepper } from "@/components/product-create/atom/PcPriceStepper.tsx"
import type { SelectOption } from "@/components/product-create/atom/PcSelect.tsx"
import PcSelect from "@/components/product-create/atom/PcSelect.tsx"
import {
	createProductFirstSchema,
	createProductFirstSchemaKeys,
} from "@/schema/product.ts"
import PcBaseWrapper from "@/components/product-create/atom/PcBaseWrapper.tsx"
import type { CreateProductQueryParams } from "@/types/account/searchParams.ts"
import { getLlmList } from "@/action/product/llmAction.ts"
import { getProductCategoryList } from "@/action/product/productCategoryAction.ts"
import type { GetLlmListResponseType } from "@/types/product/llmType.ts"
import type { GetCategoryListResponseType } from "@/types/product/productCategory.ts"
import type { CreateProductTempRequestType } from "@/types/product/productUpsertType.ts"

const TITLE_MAX_LENGTH = 50
const TEXTAREA_MAX_LENGTH = 4096

interface CreateProductFirstPageProps {
	searchParams: CreateProductQueryParams
}
export default function CreateProductFirstPage({
	// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars -- This prop is used in the original code
	searchParams,
}: CreateProductFirstPageProps) {
	const { control, register, watch, getValues, setValue } = useForm({
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
	const lastSaved = ""

	const [aiModelOptions, setAiModelOptions] = useState<SelectOption[]>([])
	const [topCategories, setTopCategories] = useState<SelectOption[]>([])
	const [subCategories, setSubCategories] = useState<SelectOption[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const llmResponse = await getLlmList({ llmType: "" })
				const llmList = llmResponse.result
				setAiModelOptions(
					llmList.map((llm: GetLlmListResponseType) => ({
						value: llm.llmId.toString(),
						label: llm.llmName,
						extraProps: {
							...llm,
						},
					})),
				)

				const categoryResponse = await getProductCategoryList({
					parentCategoryUuid: "",
				})
				const categoryList = categoryResponse.result
				setTopCategories(
					categoryList.map((category: GetCategoryListResponseType) => ({
						value: category.categoryUuid,
						label: category.categoryName,
						extraProps: {
							...category,
						},
					})),
				)
			} catch (error) {
				// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
				console.error("Error fetching data:", error)
			}
		}

		fetchData().then()
	}, [])

	const handleTopCategoryChange = async (value: string) => {
		try {
			setValue(createProductFirstSchemaKeys.subCategoryUuid, "")
			const response = await getProductCategoryList({
				parentCategoryUuid: value,
			})
			const subCategoryList = response.result
			setSubCategories(
				subCategoryList.map((category: GetCategoryListResponseType) => ({
					value: category.categoryUuid,
					label: category.categoryName,
				})),
			)
		} catch (error) {
			// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
			console.error("Error fetching subcategories:", error)
		}
	}

	const onSaveDraft = () => {
		const values = getValues()
		const reqBody: CreateProductTempRequestType = {
			sellerUuid: "", // todo: 판매자 uuid 가져오기 (로그인 정보에서 가져오기)
			productName: values.productName,
			price: values.price,
			prompt: values.prompt,
			description: values.description,
			llmId: Number(values.llmId),
			topCategoryUuid: values.topCategoryUuid,
			subCategoryUuid: values.subCategoryUuid,
			discountRate: values.discountRate,
		}
		// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
		console.log("onSaveDraft", reqBody)
		// createTempProduct(reqBody).then()
	}

	return (
		<form className="flex max-w-5xl flex-col gap-4">
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

			<PcBaseWrapper className="w-full max-w-[31.25rem]">
				<PcTitle>Category</PcTitle>
				<Controller
					name={createProductFirstSchemaKeys.topCategoryUuid}
					control={control}
					rules={{ required: "Theme is required" }}
					render={({ field }) => (
						<PcSelect
							options={topCategories}
							placeholder="Select AI Model"
							onValueChange={(value) => {
								field.onChange(value)
								handleTopCategoryChange(value).then()
							}}
							defaultValue={field.value}
						/>
					)}
				/>
			</PcBaseWrapper>

			<PcBaseWrapper className="mt-6 w-full max-w-[31.25rem]">
				<PcTitle>Subcategory</PcTitle>
				<Controller
					name={createProductFirstSchemaKeys.subCategoryUuid}
					control={control}
					rules={{ required: "Theme is required" }}
					render={({ field }) => (
						<PcSelect
							options={subCategories}
							placeholder="Select AI Model"
							onValueChange={field.onChange}
							defaultValue={field.value}
						/>
					)}
				/>
			</PcBaseWrapper>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2" />

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

			<PcSaveBar lastSaved={lastSaved} onSaveDraft={onSaveDraft} />
		</form>
	)
}
