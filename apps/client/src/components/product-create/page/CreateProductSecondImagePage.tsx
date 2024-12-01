"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import {
	createProductSecondImageSchema,
	createProductSecondSchemaKeys,
} from "@/schema/product.ts"
import PcSelect from "@/components/product-create/atom/PcSelect.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"
import PcDropZone from "@/components/product-create/atom/PcDropZone.tsx"
import { extractPromptVariables } from "@/lib/productUtils.ts"
import PcBaseWrapper from "@/components/product-create/atom/PcBaseWrapper.tsx"
import PcBoundary from "@/components/product-create/atom/PcBoundary.tsx"
import PcLabel from "@/components/product-create/atom/PcLabel.tsx"
import PcButton from "@/components/product-create/atom/PcButton.tsx"
import PcPromptSampleSkeleton from "@/components/product-create/atom/PcPromptSampleSkeleton.tsx"
import PcSaveBar from "@/components/product-create/molecule/PcSaveBar.tsx"
import PcImagePromptSampleList from "@/components/product-create/molecule/PcImagePromptSampleList.tsx"

// interface CreateProductSecondTextPageProps {}

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

// Mock API call
const fetchPrompt = () => {
	return new Promise<string>((resolve) => {
		setTimeout(() => {
			resolve(
				"Please provide a prompt for [the AI model] to generate [the text].",
			)
		}, 1000) // Simulate network delay
	})
}

type FormData = z.infer<typeof createProductSecondImageSchema>

const modelVersion = [
	{ value: "1", label: "Chat GPT 3.5" },
	{ value: "2", label: "Chat GPT 4" },
	{ value: "3", label: "Chat GPT 4o" },
]

/*
 * todo:
 *   1) model version API로 가져오기
 *   2) prompt API로 가져오기
 *   3) prompt 가져오는 중에 loading spinner 추가하기
 *   4) prompt 가져오는 중에 error handling 추가하기
 *   5) 상품 등록 API 호출하기
 */
export default function CreateProductSecondImagePage() {
	const [prompt, setPrompt] = useState("")
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [currentImage, setCurrentImage] = useState<File | null>(null)
	const minResults = 4

	const { register, control, handleSubmit, setValue } = useForm<FormData>({
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

	const extractPromptVars = useCallback((_prompt: string) => {
		return extractPromptVariables(_prompt)
	}, [])

	useEffect(() => {
		const getPrompt = async () => {
			try {
				setLoading(true)
				const fetchedPrompt = await fetchPrompt()
				setPrompt(fetchedPrompt)
				const extractedVars = extractPromptVars(fetchedPrompt)
				replace(extractedVars)
			} catch (err) {
				setError("Failed to fetch prompt. Please try again later.")
			} finally {
				setLoading(false)
			}
		}

		getPrompt().then(() => {
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

	if (loading) return <div>Loading prompt...</div>
	if (error)
		return (
			<div>
				{error} {minResults}
			</div>
		)

	return (
		<form className="flex flex-col gap-4">
			<AccountTitleText className="w-full">Create New Product</AccountTitleText>
			{/* Model version and Seed*/}
			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
				<PcBaseWrapper>
					<PcTitle>Model Version</PcTitle>
					<Controller
						name={createProductSecondSchemaKeys.llmVersionId}
						control={control}
						render={({ field }) => (
							<PcSelect
								options={modelVersion}
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
						{...register(createProductSecondSchemaKeys.seed)}
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
			<PcSaveBar className="mt-10" />
		</form>
	)
}
