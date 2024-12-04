"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { ThreeDots } from "react-loader-spinner"
import type { Session } from "next-auth"
import dayjs from "dayjs"
import { router } from "next/client"
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
import { extractPromptVariables, replaceVariables } from "@/lib/productUtils.ts"
import PcBaseWrapper from "@/components/product-create/atom/PcBaseWrapper.tsx"
import PcBoundary from "@/components/product-create/atom/PcBoundary.tsx"
import PcLabel from "@/components/product-create/atom/PcLabel.tsx"
import PcButton from "@/components/product-create/atom/PcButton.tsx"
import PcPromptSampleSkeleton from "@/components/product-create/atom/PcPromptSampleSkeleton.tsx"
import PcSaveBar from "@/components/product-create/molecule/PcSaveBar.tsx"
import PcImagePromptSampleList from "@/components/product-create/organism/PcImagePromptSampleList.tsx"
import type { CreateProductQueryParams } from "@/types/account/searchParams.ts"
import { removeStorageItem, setProductUuid } from "@/lib/localStorage.ts"
import {
	getProductDetail,
	updateProduct,
} from "@/action/product/productUpsertAction.ts"
import { getLlmVersionList } from "@/action/product/llmAction.ts"
import { localStorageKeys } from "@/config/product/localStorage.ts"
import type { ModifyProductRequestType } from "@/types/product/productUpsertType.ts"

interface DropResult {
	draggableId: string
	type: string
	source: {
		droppableId: string
		index: number
	}
	destination: {
		droppableId: string
		index: number
	} | null
	reason: "DROP" | "CANCEL"
}

type FormData = z.infer<typeof createProductSecondImageSchema>

/*
 * todo:
 *   1) model version API로 가져오기
 *   2) prompt API로 가져오기
 *   3) prompt 가져오는 중에 loading spinner 추가하기
 *   4) prompt 가져오는 중에 error handling 추가하기
 *   5) 상품 등록 API 호출하기
 */

interface CreateProductSecondImagePageProps {
	searchParams: CreateProductQueryParams
	session: Session | null
}
export default function CreateProductSecondImagePage({
	searchParams,
}: CreateProductSecondImagePageProps) {
	const [prompt, setPrompt] = useState("")
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [lastSaved, setLastSaved] = useState<string>("")
	const [llmVersionList, setLlmVersionList] = useState<SelectOption[]>([])
	const [currentImage, setCurrentImage] = useState<File | null>(null)
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

				// setValue(createProductSecondImageSchemaKeys.promptResult, "")

				// 이 단계에 오면 결국에는 productUuid가 있을 거 같은데 조건문이 필요할까?
				// 저장된 상품이 있을 경우, 상품 정보를 세팅
				if (productUuid) {
					setValue(createProductSecondImageSchemaKeys.seed, productData.seed)

					String(productData.llmVersionId) &&
						setValue(
							createProductSecondImageSchemaKeys.llmVersionId,
							String(productData.llmVersionId),
						)
				}
			} catch (err) {
				setError("Failed to fetch prompt. Please try again later.")
			} finally {
				setLoading(false)
			}
		}

		initExistingData().then(() => {
			// do nothing
		})
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

	const handleFileDrop = (file: File) => {
		setValue("promptResult", file)
		setCurrentImage(file)
	}

	const resetImage = () => {
		setValue("promptResult", undefined)
		setCurrentImage(null)
	}

	// save handler
	const onSave = (type: "draft" | "next") => {
		updatePromptProduct()
		if (type === "next") {
			removeStorageItem(localStorageKeys.curTempProductUuid)
			router.push(`account?view=create-product&step=3`)
		}
	}

	const onBack = () => {
		router.back()
	}

	const updatePromptProduct = () => {
		const values = getValues()

		const reqBody: ModifyProductRequestType = {
			seed: values.seed,
			llmVersionId: Number(values.llmVersionId),
			contents: contentFields.map((content, index) => ({
				contentOrder: index + 1,
				sampleValue: replaceVariables(prompt, content.value),
				contentUrl: "",
			})),
		}
		// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
		console.log("updateProduct reqbody", reqBody)
		updateProduct(reqBody).then(() => {
			setLastSaved(dayjs().format("YYYY-MM-DD HH:mm"))
		})
	}

	if (loading)
		return (
			<div className="flex max-w-5xl flex-col gap-4">
				<AccountTitleText className="w-full">
					Create New Product
				</AccountTitleText>
				<div className="mt-6 flex flex-col">
					<ThreeDots
						visible
						height="80"
						width="80"
						color="#A913F9"
						radius="9"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
					<span className="text-xl font-medium leading-[150%] text-white">
						Loading prompt...
					</span>
				</div>
			</div>
		)
	if (error) return <div>{error}</div>

	return (
		<form className="flex max-w-5xl flex-col gap-4">
			<AccountTitleText className="w-full">Create New Product</AccountTitleText>
			{/* Model version and Seed*/}
			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
				<PcBaseWrapper>
					<PcTitle>Model Version</PcTitle>
					<Controller
						name={createProductSecondImageSchemaKeys.llmVersionId}
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
				</PcBaseWrapper>
				<PcBaseWrapper>
					<PcTitle>Seed</PcTitle>
					<PcInput
						placeholder="Enter Model Seed"
						className="h-9"
						type="number"
						{...register(createProductSecondImageSchemaKeys.seed)}
					/>
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
				<PcImagePromptSampleList
					contentFields={contentFields}
					onDragEnd={onDragEnd}
					onRemove={remove}
				/>
			) : (
				<PcPromptSampleSkeleton />
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
