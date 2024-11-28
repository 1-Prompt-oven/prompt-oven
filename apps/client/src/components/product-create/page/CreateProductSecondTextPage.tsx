"use client"

import React, { useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Label } from "@repo/ui/label"
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"
import {
	createProductSecondSchema,
	createProductSecondSchemaKeys,
} from "@/schema/product.ts"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import PcSelect from "@/components/product-create/atom/PcSelect.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"
import { extractPromptVariables, replaceVariables } from "@/lib/productUtils.ts"

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

type FormData = z.infer<typeof createProductSecondSchema>

const modelVersion = [
	{ value: "1", label: "Chat GPT 3.5" },
	{ value: "2", label: "Chat GPT 4" },
	{ value: "3", label: "Chat GPT 4o" },
]

export default function CreateProductSecondTextPage() {
	const [prompt, setPrompt] = useState("")

	useEffect(() => {
		const getPrompt = async () => {
			try {
				const fetchedPrompt = await fetchPrompt()
				setPrompt(fetchedPrompt)
				const extractedVars = extractPromptVariables(fetchedPrompt)
				replace(extractedVars)
			} catch (error) {
				// Handle error
			}
		}

		getPrompt().then(() => {
			// do nothing
		})
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

	const { fields: contentFields, append: appendContent } = useFieldArray({
		control,
		name: "contents",
	})

	const onSubmit = (data: FormData) => {
		const varObj: Record<string, string> = data.promptVars.reduce(
			(acc, { name, value }) => {
				// @ts-expect-error -- TS doesn't know that name is a string
				acc[name] = value
				return acc
			},
			{},
		)
		const newContent = {
			name: prompt,
			value: data.promptVars.map((v) => `${v.name}: ${v.value}`).join(", "),
			result: data.promptResult
				? replaceVariables(data.promptResult, varObj)
				: "",
		}
		appendContent(newContent)
		setValue("promptResult", "")
	}

	return (
		<form className="flex flex-col gap-4">
			<AccountTitleText className="w-full">Create New Product</AccountTitleText>

			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="space-y-4">
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
				</div>

				<div className="space-y-4">
					<PcTitle>Subcategory</PcTitle>
					<PcInput
						placeholder="Enter Model Seed"
						className="h-9"
						type="number"
						{...register(createProductSecondSchemaKeys.seed)}
					/>
				</div>
			</div>

			{fields.map((field, index) => (
				<div key={field.id}>
					<Label htmlFor={`promptVar-${index}`}>{field.name}</Label>
					<Input
						{...register(`promptVars.${index}.value`)}
						className="text-white"
						id={`promptVar-${index}`}
						placeholder={`Enter value for ${field.name}`}
					/>
				</div>
			))}

			<div>
				<Label htmlFor="promptResult">Prompt Result</Label>
				<textarea
					{...register("promptResult")}
					id="promptResult"
					placeholder="Enter prompt result"
					className="h-32"
				/>
			</div>

			<Button type="button" onClick={handleSubmit(onSubmit)}>
				Submit
			</Button>

			{contentFields.length > 0 && (
				<div className="mt-4 *:text-white">
					<h2 className="text-lg font-semibold">Results:</h2>
					<ul className="mt-2 list-disc pl-5">
						{contentFields.map((content, index) => (
							<li key={index}>
								<strong>Prompt:</strong> {content.name}
								<br />
								<strong>Variables:</strong> {content.value}
								<br />
								<strong>Result:</strong> {content.result}
							</li>
						))}
					</ul>
				</div>
			)}
		</form>
	)
}
