"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import type { Session } from "next-auth"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import {
	createProductSecondImageSchema,
	createProductSecondImageSchemaKeys,
} from "@/schema/product.ts"
import PcSelect, {
	type SelectOption,
} from "@/components/product-create/atom/PcSelect.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"
import PcDropZone from "@/components/product-create/atom/PcDropZone.tsx"
import {
	convertToBase64,
	extractPromptVariables,
	handleProductImageUpload,
	replaceVariables,
} from "@/lib/productUtils.ts"
import PcBaseWrapper from "@/components/product-create/atom/PcBaseWrapper.tsx"
import PcBoundary from "@/components/product-create/atom/PcBoundary.tsx"
import PcLabel from "@/components/product-create/atom/PcLabel.tsx"
import PcButton from "@/components/product-create/atom/PcButton.tsx"
import PcPromptSampleSkeleton from "@/components/product-create/atom/PcPromptSampleSkeleton.tsx"
import PcSaveBar from "@/components/product-create/molecule/PcSaveBar.tsx"
import PcImagePromptSampleList from "@/components/product-create/organism/PcImagePromptSampleList.tsx"
import type { CreateProductQueryParams } from "@/types/account/searchParams.ts"
import {
	getStorageItem,
	removeStorageItem,
	setProductUuid,
} from "@/lib/localStorage.ts"
import {
	getProductDetail,
	updateProduct,
} from "@/action/product/productAction.ts"
import { getLlmVersionList } from "@/action/product/llmAction.ts"
import { localStorageKeys } from "@/config/product/localStorage.ts"
import type {
	GetProductDetailResponseType,
	ModifyProductRequestType,
} from "@/types/product/productUpsertType.ts"
import type { DropResult } from "@/types/product/componentType.ts"
import PcLoading from "@/components/product-create/atom/PcLoading.tsx"
import PcError from "@/components/product-create/atom/PcError.tsx"
import PcErrorMessage from "@/components/product-create/atom/PcErrorMessage.tsx"

type FormData = z.infer<typeof createProductSecondImageSchema>

interface CreateProductSecondImagePageProps {
	searchParams: CreateProductQueryParams
	session: Session | null
}

// todo : 최소 등록 개수 제한하기 (2개 이상)
// todo : llm version 리스트 초기 렌더링 시, placeholder가 나오지 않는 문제 해결하기
export default function CreateProductSecondImagePage({
	searchParams,
}: CreateProductSecondImagePageProps) {
	const router = useRouter()

	const [prompt, setPrompt] = useState("")
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [lastSaved, setLastSaved] = useState<string>("")
	const [llmVersionList, setLlmVersionList] = useState<SelectOption[]>([])
	const [currentImage, setCurrentImage] = useState<File | null>(null)

	const [product, setProduct] = useState<GetProductDetailResponseType | null>(
		null,
	)

	// error state for product fields
	const [llmVersionError, setLlmVersionError] = useState<string>("")
	const [contentsError, setContentsError] = useState<string>("")
	const resetFiledErrors = () => {
		setLlmVersionError("")
		setContentsError("")
	}
	const checkLlmVersion = (llmVersion: string) => {
		if (!llmVersion) {
			setLlmVersionError(`Please select llm version.`)
			return false
		}
		return true
	}
	const checkContents = (contents: FormData["contents"]) => {
		if (contents.length <= 1) {
			setContentsError(`Please make example output at least 2.`)
			return false
		}
		return true
	}
	const checkRequiredFieldsValid = () => {
		const values = getValues()
		let isValid = true
		if (!checkLlmVersion(values.llmVersionId)) isValid = false
		if (!checkContents(values.contents)) isValid = false
		return isValid
	}

	// const minResults = 4

	const extractPromptVars = useCallback((_prompt: string) => {
		return extractPromptVariables(_prompt)
	}, [])

	const { register, control, handleSubmit, setValue, getValues } =
		useForm<FormData>({
			resolver: zodResolver(createProductSecondImageSchema),
			defaultValues: {
				promptVars: [],
				promptResult: undefined,
				contents: [],
				seed: "",
				llmVersionId: "",
			},
		})

	const { fields, replace } = useFieldArray({
		control,
		name: "promptVars",
	})

	const {
		fields: contentFields,
		append: appendContent,
		move,
		remove,
	} = useFieldArray({
		control,
		name: "contents",
	})

	useEffect(() => {
		const initExistingData = async () => {
			try {
				setLoading(true)
				const productUuid = setProductUuid(searchParams.productUuid ?? "")

				const productData = (await getProductDetail({ productUuid })).result
				setProduct(productData)

				// llm version list 조회
				const _llmVersionList = (
					await getLlmVersionList({ llmId: productData.llmId })
				).result
				setLlmVersionList(
					_llmVersionList.map((item) => ({
						label: item.llmVersionName,
						value: String(item.llmVersionId),
						extraProps: {
							...item,
						},
					})),
				)
				// 상품의 프롬프트 세팅
				setPrompt(productData.prompt)
				const extractedVars = extractPromptVars(productData.prompt)
				replace(extractedVars)

				// 마지막 저장 시간 세팅
				setLastSaved(dayjs(productData.updatedAt).format("YYYY-MM-DD HH:mm"))
				// 이 단계에 오면 결국에는 productUuid가 있을 거 같은데 조건문이 필요할까?
				// 저장된 상품이 있을 경우, 상품 정보를 세팅
				if (productUuid) {
					setValue(createProductSecondImageSchemaKeys.seed, productData.seed)

					const _llmVersionId =
						_llmVersionList.find(
							(item) => item.llmVersionId === productData.llmVersionId,
						)?.llmVersionId ?? ""
					setValue(
						createProductSecondImageSchemaKeys.llmVersionId,

						String(_llmVersionId),
					)
				}
			} catch (err) {
				setError("Failed to fetch prompt. Please try again later.")
			} finally {
				setLoading(false)
			}
		}

		const _productUuid = getStorageItem(localStorageKeys.curTempProductUuid)
		if (!_productUuid && !searchParams.productUuid) {
			router.back()
		}

		initExistingData().then()
	}, [extractPromptVars, replace])

	const onSubmit = (data: FormData) => {
		if (data.promptResult) {
			const newContent = {
				name: prompt,
				value: data.promptVars.reduce<Record<string, string>>((acc, curr) => {
					acc[curr.name] = curr.value
					return acc
				}, {}),
				result: data.promptResult,
			}
			appendContent(newContent)

			// Reset all promptVars values
			data.promptVars.forEach((_, index) => {
				setValue(`promptVars.${index}.value`, "")
			})

			// Reset promptResult and image
			setValue("promptResult", undefined)
			setCurrentImage(null)
		}
	}

	// Drag and drop
	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return

		move(result.source.index, result.destination.index)
	}

	/*
			const reader = new FileReader()
			reader.onloadend = () => {
				setImage(reader.result as string)
			}
	*/

	const handleFileDrop = (file: File) => {
		setValue("promptResult", file)
		setCurrentImage(file)
	}

	const resetImage = () => {
		setValue("promptResult", undefined)
		setCurrentImage(null)
	}

	// save handler
	const onSave = async (type: "draft" | "next") => {
		resetFiledErrors()
		if (type === "next" && !checkRequiredFieldsValid()) return

		await updatePromptProduct()
		if (type === "next") {
			removeStorageItem(localStorageKeys.curTempProductUuid)
			router.push(
				`account?view=create-product&step=3&productName=${product?.productName}`,
			)
		}
	}

	const onBack = () => {
		router.back()
	}

	const updatePromptProduct = async () => {
		const values = getValues()

		const formData = new FormData()

		// Upload images to S3 and get URLs
		const uploadPromises = contentFields.map(async (content) => {
			const imageFile = content.result
			const key = `product-images/${product?.productUuid}`
			const bucket = "product"

			const imageUrl = await convertToBase64(imageFile)

			const success = await handleProductImageUpload(
				formData,
				imageUrl,
				undefined,
				key,
				bucket,
			)
			return success ? (formData.get(key) as string) : ""
		})

		const _contentUrls = await Promise.all(uploadPromises)

		const reqBody: ModifyProductRequestType = {
			...product,
			seed: values.seed,
			llmVersionId: Number(values.llmVersionId),
			contents: contentFields.map((content, index) => ({
				contentOrder: index + 1,
				sampleValue: replaceVariables(prompt, content.value),
				contentUrl: _contentUrls[index],
			})),
		}
		await updateProduct(reqBody)
		setLastSaved(dayjs().format("YYYY-MM-DD HH:mm"))
	}

	if (loading) return <PcLoading />
	if (error) return <PcError error={error} />

	return (
		<form className="flex max-w-5xl flex-col gap-4">
			<AccountTitleText className="w-full">Create New Product</AccountTitleText>
			{/* Model version and Seed*/}
			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
				<PcBaseWrapper>
					<PcTitle>Model Version</PcTitle>
					<Controller
						name={createProductSecondImageSchemaKeys.llmVersionId}
						rules={{ required: "Model Version is required" }}
						control={control}
						render={({ field }) => (
							<PcSelect
								options={llmVersionList}
								placeholder="Select AI Model"
								onValueChange={field.onChange}
								defaultValue={field.value}
							/>
						)}
					/>
					{llmVersionError ? (
						<PcErrorMessage errorMessage={llmVersionError} />
					) : (
						<span className="h-[18px] w-full text-transparent"> -- </span>
					)}
				</PcBaseWrapper>
				<PcBaseWrapper>
					<PcTitle>Seed</PcTitle>
					<PcInput
						placeholder="Enter Model Seed"
						className="h-9"
						type="number"
						{...register(createProductSecondImageSchemaKeys.seed)}
					/>
					<span className="h-[18px] w-full text-transparent"> -- </span>
				</PcBaseWrapper>
			</div>
			{/* Sample variables and outputs */}

			<PcTitle className="mt-6">Sample Prompt</PcTitle>
			<PcBoundary>
				<PcBaseWrapper className="space-y-2">
					<PcLabel>Sample Input</PcLabel>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
						{fields.map((field, index) => (
							<PcBaseWrapper className="relative space-y-2" key={field.id}>
								<PcInput
									{...register(`promptVars.${index}.value`)}
									className="text-white"
									id={`promptVar-${index}`}
									placeholder={field.name}
								/>
							</PcBaseWrapper>
						))}
					</div>
				</PcBaseWrapper>
				<PcBaseWrapper className="space-y-2">
					<PcLabel>Sample Output</PcLabel>
					<PcDropZone
						onFileDrop={handleFileDrop}
						currentImage={currentImage}
						resetImage={resetImage}
					/>
				</PcBaseWrapper>
				<PcButton
					className="w-full"
					type="button"
					onClick={handleSubmit(onSubmit)}>
					Submit
				</PcButton>
			</PcBoundary>

			<PcTitle className="mt-6">Examples</PcTitle>
			{contentFields.length > 0 ? (
				<>
					<PcImagePromptSampleList
						contentFields={contentFields}
						onDragEnd={onDragEnd}
						onRemove={remove}
					/>
					{contentsError ? (
						<PcErrorMessage errorMessage={contentsError} />
					) : (
						<span className="h-[18px] w-full text-transparent"> -- </span>
					)}
				</>
			) : (
				<>
					<PcPromptSampleSkeleton />
					{contentsError ? (
						<PcErrorMessage errorMessage={contentsError} />
					) : (
						<span className="h-[18px] w-full text-transparent"> -- </span>
					)}
				</>
			)}
			<PcSaveBar
				className="mt-10"
				lastSaved={lastSaved}
				onDraft={() => onSave("draft")}
				onNext={() => onSave("next")}
				onBack={onBack}
			/>
		</form>
	)
}
