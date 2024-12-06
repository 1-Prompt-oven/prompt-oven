"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from "react"
import type { Session } from "next-auth"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
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
import type {
	CreateProductTempRequestType,
	GetProductDetailResponseType,
	ModifyProductRequestType,
} from "@/types/product/productUpsertType.ts"
import { getSellerProfile } from "@/action/settlement/settlementAction.ts"
import {
	createTempProduct,
	getProductDetail,
	updateProduct,
} from "@/action/product/productUpsertAction.ts"
import { getStorageItem, setProductUuid } from "@/lib/localStorage.ts"
import { localStorageKeys } from "@/config/product/localStorage.ts"
import PcLoading from "@/components/product-create/atom/PcLoading.tsx"
import PcError from "@/components/product-create/atom/PcError.tsx"
import { extractPromptVariables } from "@/lib/productUtils.ts"

const TITLE_MAX_LENGTH = 50
const TEXTAREA_MAX_LENGTH = 4096

interface CreateProductFirstPageProps {
	searchParams: CreateProductQueryParams
	session: Session | null
}
export default function CreateProductFirstPage({
	session,
	searchParams,
}: CreateProductFirstPageProps) {
	const router = useRouter()

	const [sellerUuid, setSellerUuid] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [lastSaved, setLastSaved] = useState<string>("")

	const [product, setProduct] = useState<GetProductDetailResponseType | null>(
		null,
	)
	const [promptTextError, setPromptTextError] = useState<string>("")

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
	const selectedTopCategory = watch(
		createProductFirstSchemaKeys.topCategoryUuid,
	)

	const [aiModelOptions, setAiModelOptions] = useState<SelectOption[]>([])
	const [topCategories, setTopCategories] = useState<SelectOption[]>([])
	const [subCategories, setSubCategories] = useState<SelectOption[]>([])

	// API call functions
	const getSubCategories = async (
		topCategoryUuid: string,
		selectedSubCategoryUuid = "",
	) => {
		setValue(
			createProductFirstSchemaKeys.subCategoryUuid,
			selectedSubCategoryUuid,
		)
		const response = await getProductCategoryList({
			parentCategoryUuid: topCategoryUuid,
		})
		const subCategoryList = response.result
		setSubCategories(
			subCategoryList.map((category: GetCategoryListResponseType) => ({
				value: category.categoryUuid,
				label: category.categoryName,
			})),
		)
	}

	useEffect(() => {
		// 상품 생성 화면에 진입하면, 기존에 작업 중인 상품 아이디가 있는지 로컬 스토리지와 url의 쿼리스트링을 확인합니다.
		// 존재하면 작업 중인 상품 정보를 들고와서 상품 정보를 업데이트 하고, 없으면 상품 정보를 업데이트 하지 않습니다.
		const initExistingProductData = async () => {
			try {
				const productUuid = setProductUuid(searchParams.productUuid ?? "")
				if (productUuid) {
					const productData = (await getProductDetail({ productUuid })).result
					setProduct(productData)
					setValue(
						createProductFirstSchemaKeys.llmId,
						String(productData.llmId),
					)
					setValue(
						createProductFirstSchemaKeys.productName,
						productData.productName,
					)
					setValue(
						createProductFirstSchemaKeys.topCategoryUuid,
						productData.topCategoryUuid,
					)
					setValue(
						createProductFirstSchemaKeys.subCategoryUuid,
						productData.subCategoryUuid,
					)
					setValue(createProductFirstSchemaKeys.prompt, productData.prompt)
					setValue(
						createProductFirstSchemaKeys.description,
						productData.description,
					)
					setValue(createProductFirstSchemaKeys.price, productData.price)
					setValue(
						createProductFirstSchemaKeys.discountRate,
						productData.discountRate,
					)

					setLastSaved(dayjs(productData.updatedAt).format("YYYY-MM-DD HH:mm"))
				}
			} catch (e) {
				// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
				console.error("Error fetching subcategories:", e)
				setError("Failed to fetch ProductData. Please try again later.")
			}
		}
		const fetchPageData = async () => {
			try {
				setLoading(true)
				// llm list api 호출
				const llmList = (await getLlmList({ llmType: "" })).result
				setAiModelOptions(
					llmList.map((llm: GetLlmListResponseType) => ({
						value: llm.llmId.toString(),
						label: llm.llmName,
						extraProps: {
							...llm,
						},
					})),
				)

				// top category list api 호출
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

				const topCategoryUuid = getValues(
					createProductFirstSchemaKeys.topCategoryUuid,
				)
				const subCategoryUuid = getValues(
					createProductFirstSchemaKeys.subCategoryUuid,
				)
				if (topCategoryUuid) {
					await getSubCategories(topCategoryUuid, subCategoryUuid)
				}

				// user seller uuid 가져오기 api 호출
				const sellerUuidRes = await getSellerProfile({
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- memberUUID는 세션에 있습니다.
					memberUUID: session?.user?.memberUUID as string,
				})
				// note: 판매자 등록은 한 번 한다는 가정으로 작성한 코드

				const _sellerUuid = sellerUuidRes.result[0].settlementProfileID // session?.user?.memberUUID as string // sellerUuidRes.result[0].settlementProfileID
				setSellerUuid(_sellerUuid)
			} catch (e) {
				// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
				console.error("Error fetching data:", e)
				setError("Failed to fetch data. Please try again later.")
			} finally {
				setLoading(false)
			}
		}

		const mainEffect = async () => {
			await initExistingProductData()
			await fetchPageData()
		}
		mainEffect().then()
	}, [searchParams.productUuid, session])

	const handleTopCategoryChange = async (value: string) => {
		try {
			await getSubCategories(value)
		} catch (e) {
			// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
			console.error("Error fetching subcategories:", e)
			setError("Failed to fetch subcategories. Please try again later.")
		}
	}

	const checkPromptText = () => {
		const values = getValues()
		const extractedPromptVars = extractPromptVariables(values.prompt)
		if (extractedPromptVars.length === 0) {
			setPromptTextError(
				`Please make variables with [square brackets] in the prompt text.`,
			)
			return false
		}
		return true
	}

	const onSave = async (type: "draft" | "next") => {
		// next 버튼 클릭 시 prompt text 체크
		setPromptTextError("")
		if (type === "next" && !checkPromptText()) return

		let productUuid = getStorageItem(localStorageKeys.curTempProductUuid)
		if (productUuid) {
			await updatePromptProduct()
		} else {
			productUuid = await savePromptDraft()
		}
		if (type === "next") {
			const llmId = getValues(createProductFirstSchemaKeys.llmId)
			const llmType = aiModelOptions.find((llm) => llm.value === llmId)
				?.extraProps?.llmType as string
			router.push(
				`account?view=create-product&step=2&llmType=${llmType}&productUuid=${productUuid}`,
			)
		} else {
			setLastSaved(dayjs().format("YYYY-MM-DD HH:mm"))
		}
	}

	const onBack = () => {
		router.back()
	}

	const savePromptDraft = async () => {
		const values = getValues()
		const reqBody: CreateProductTempRequestType = {
			sellerUuid,
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
		console.log("onSaveDraft reqbody", reqBody)
		const res = await createTempProduct(reqBody)
		// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
		console.log("onSaveDraft", res.result)
		setProductUuid(res.result.productUuid)
		return res.result.productUuid
	}

	const updatePromptProduct = () => {
		const values = getValues()
		const reqBody: ModifyProductRequestType = {
			...product,
			productUuid: getStorageItem(localStorageKeys.curTempProductUuid),
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
		console.log("updateProduct reqbody", reqBody)
		return updateProduct(reqBody)
	}

	if (loading) return <PcLoading />
	if (error) return <PcError error={error} />

	return (
		<form className="flex max-w-5xl flex-col gap-4">
			<AccountTitleText className="w-full">Create New Product</AccountTitleText>

			<PcBaseWrapper className="mt-6">
				<PcTitle>AI Model</PcTitle>
				<Controller
					name={createProductFirstSchemaKeys.llmId}
					control={control}
					rules={{ required: "AI Model is required" }}
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
					rules={{ required: "Category value is required" }}
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

			{/* 메인 카테고리가 선택되면 나머지 컴포넌트들을 렌더링한다. */}
			{selectedTopCategory ? (
				<>
					<PcBaseWrapper className="mt-6 w-full max-w-[31.25rem]">
						<PcTitle>Subcategory</PcTitle>
						<Controller
							name={createProductFirstSchemaKeys.subCategoryUuid}
							control={control}
							rules={{ required: "Category value is required" }}
							render={({ field }) => (
								<PcSelect
									options={subCategories}
									placeholder="Select AI Model"
									onValueChange={(value) => {
										field.onChange(value)
									}}
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
							length={promptWatch}
							errMsg={promptTextError}>
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

					<PcSaveBar
						lastSaved={lastSaved}
						onDraft={() => onSave("draft")}
						onNext={() => onSave("next")}
						onBack={onBack}
					/>
				</>
			) : null}
		</form>
	)
}
