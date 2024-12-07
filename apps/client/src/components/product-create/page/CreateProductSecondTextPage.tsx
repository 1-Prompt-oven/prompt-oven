"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import type { Session } from "next-auth"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"
import {
	createProductSecondTextSchema,
	createProductSecondTextSchemaKeys,
} from "@/schema/product.ts"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import type { SelectOption } from "@/components/product-create/atom/PcSelect.tsx"
import PcSelect from "@/components/product-create/atom/PcSelect.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"
import { extractPromptVariables, replaceVariables } from "@/lib/productUtils.ts"
import { PcTextarea } from "@/components/product-create/atom/PcTextarea.tsx"
import PcBaseWrapper from "@/components/product-create/atom/PcBaseWrapper.tsx"
import PcLabel from "@/components/product-create/atom/PcLabel.tsx"
import PcBoundary from "@/components/product-create/atom/PcBoundary.tsx"
import PcButton from "@/components/product-create/atom/PcButton.tsx"
import PcTextPromptSampleList from "@/components/product-create/organism/PcTextPromptSampleList.tsx"
import PcSaveBar from "@/components/product-create/molecule/PcSaveBar.tsx"
import PcPromptSampleSkeleton from "@/components/product-create/atom/PcPromptSampleSkeleton.tsx"
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
import type {
	GetProductDetailResponseType,
	ModifyProductRequestType,
} from "@/types/product/productUpsertType.ts"
import { localStorageKeys } from "@/config/product/localStorage.ts"
import type { DropResult } from "@/types/product/componentType.ts"
import PcLoading from "@/components/product-create/atom/PcLoading.tsx"
import PcError from "@/components/product-create/atom/PcError.tsx"

type FormData = z.infer<typeof createProductSecondTextSchema>

interface CreateProductSecondTextPageProps {
	searchParams: CreateProductQueryParams
	session: Session | null
}

// todo : 최소 등록 개수 제한하기 (2개 이상)
// todo : llm version 리스트 초기 렌더링 시, placeholder가 나오지 않는 문제 해결하기
// todo : CreateProductSecond--Page에 중복되는 로직이 많음 --> 이후에 리펙토링 필요
export default function CreateProductSecondTextPage({
	searchParams,
}: CreateProductSecondTextPageProps) {
	const router = useRouter()

	const [prompt, setPrompt] = useState("")
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [lastSaved, setLastSaved] = useState<string>("")
	const [llmVersionList, setLlmVersionList] = useState<SelectOption[]>([])

	const [product, setProduct] = useState<GetProductDetailResponseType | null>(
		null,
	)

	const extractPromptVars = useCallback((_prompt: string) => {
		return extractPromptVariables(_prompt)
	}, [])

	const { register, control, handleSubmit, setValue, getValues } =
		useForm<FormData>({
			resolver: zodResolver(createProductSecondTextSchema),
			defaultValues: {
				promptVars: [],
				promptResult: "",
				contents: [],
				seed: "",
				llmVersionId: undefined,
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
		// replace: replaceContent,  todo: 나중에 결과도 보여주게 하기
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

				setValue(createProductSecondTextSchemaKeys.promptResult, "")
				// 이 단계에 오면 결국에는 productUuid가 있을 거 같은데 조건문이 필요할까?
				// 저장된 상품이 있을 경우, 상품 정보를 세팅
				if (productUuid) {
					setValue(createProductSecondTextSchemaKeys.seed, productData.seed)

					setValue(
						createProductSecondTextSchemaKeys.llmVersionId,
						String(productData.llmVersionId),
					)
				}
			} catch (e) {
				// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
				console.error("Error fetching subcategories:", e)
				setError("Failed to fetch ProductData. Please try again later.")
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
		const varObj: Record<string, string> = data.promptVars.reduce(
			(acc, { name, value }) => {
				return Object.assign(acc, { [name]: value })
			},
			{},
		)

		const newContent = {
			name: replaceVariables(prompt, varObj),
			value: varObj,
			result: data.promptResult || "",
		}
		appendContent(newContent)
		setValue("promptResult", "")
		// Reset the values of prompt variables
		data.promptVars.forEach((_, index) => {
			setValue(`promptVars.${index}.value`, "")
		})
	}

	// Drag and drop
	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return

		move(result.source.index, result.destination.index)
	}

	// save handler
	const onSave = async (type: "draft" | "next") => {
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

		const reqBody: ModifyProductRequestType = {
			...product,
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
						name={createProductSecondTextSchemaKeys.llmVersionId}
						rules={{ required: "Model Version is required" }}
						control={control}
						render={({ field }) => (
							<PcSelect
								options={llmVersionList}
								placeholder="Select Model Version"
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
						{...register(createProductSecondTextSchemaKeys.seed)}
					/>
				</PcBaseWrapper>
			</div>
			{/* Sample variables and outputs */}

			<PcTitle className="mt-6">Sample Prompt</PcTitle>
			<PcBoundary>
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
				<PcBaseWrapper className="space-y-2">
					<PcLabel>Sample Output</PcLabel>
					<PcTextarea
						{...register(createProductSecondTextSchemaKeys.promptResult)}
						id={createProductSecondTextSchemaKeys.promptResult}
						placeholder="Enter prompt result"
						className="h-32"
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
				<PcTextPromptSampleList
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
