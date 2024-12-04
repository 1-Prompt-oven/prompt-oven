"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import type { Session } from "next-auth"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"
import {
	createProductSecondSchema,
	createProductSecondSchemaKeys,
} from "@/schema/product.ts"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
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

// interface CreateProductSecondTextPageProps {}

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

type FormData = z.infer<typeof createProductSecondSchema>

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

interface CreateProductSecondTextPageProps {
	searchParams: CreateProductQueryParams
	session: Session | null
}
export default function CreateProductSecondTextPage({
	// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars -- This prop is used in the original code
	searchParams,
}: CreateProductSecondTextPageProps) {
	const [prompt, setPrompt] = useState("")

	const extractPromptVars = useCallback((_prompt: string) => {
		return extractPromptVariables(_prompt)
	}, [])

	const { register, control, handleSubmit, setValue } = useForm<FormData>({
		resolver: zodResolver(createProductSecondSchema),
		defaultValues: {
			promptVars: [],
			promptResult: "",
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
		const getPrompt = async () => {
			try {
				const fetchedPrompt = await fetchPrompt()
				setPrompt(fetchedPrompt)
				const extractedVars = extractPromptVars(fetchedPrompt)
				replace(extractedVars)
			} catch (error) {
				// Handle error
			}
		}

		getPrompt().then(() => {
			// do nothing
		})
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
		data.promptVars.forEach((variable, index) => {
			setValue(`promptVars.${index}.value`, "")
		})
	}

	// Drag and drop
	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return

		move(result.source.index, result.destination.index)
	}

	return (
		<form className="flex max-w-5xl flex-col gap-4">
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
						{...register("promptResult")}
						id="promptResult"
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
			<PcSaveBar className="mt-10" />
		</form>
	)
}
